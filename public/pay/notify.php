<?php
// -----------------------------------------------------------------------------
// PayFast ITN (Instant Transaction Notification) handler — the ONLY authoritative
// confirmation of payment. Runs server-to-server (the buyer's browser is not
// involved). Performs PayFast's four security checks, and only on success marks
// the order paid and emails it to the merchant for fulfilment.
//
// Always returns HTTP 200 so PayFast stops retrying; failed/invalid posts are
// logged and ignored.
// -----------------------------------------------------------------------------

require __DIR__ . '/common.php';

$cfg = pf_config();

// Capture the posted data in the order received (PHP preserves $_POST order).
$data = $_POST;

$log = function ($msg) {
    $line = '[' . date('c') . '] ' . $msg . "\n";
    @file_put_contents(pf_orders_dir() . '/itn.log', $line, FILE_APPEND | LOCK_EX);
};

// Acknowledge PayFast immediately-ish; we still finish processing below.
http_response_code(200);

if (empty($data)) {
    $log('Empty ITN payload — ignored.');
    exit;
}

$orderId = isset($data['m_payment_id']) ? $data['m_payment_id'] : '';
$order   = $orderId !== '' ? pf_load_order($orderId) : null;

// ---- Check 1: signature ----------------------------------------------------
if (!pf_valid_signature($data, $cfg['passphrase'])) {
    $log("Signature check FAILED for {$orderId}.");
    exit;
}

// ---- Check 2: source IP ----------------------------------------------------
$remoteIp = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
if (!pf_valid_ip($remoteIp)) {
    $log("IP check FAILED ({$remoteIp}) for {$orderId}.");
    exit;
}

// ---- Check 3: merchant + amount match our pending order --------------------
if ($order === null) {
    $log("No pending order found for {$orderId}.");
    exit;
}
if (!isset($data['merchant_id']) || $data['merchant_id'] !== (string) $cfg['merchant_id']) {
    $log("Merchant ID mismatch for {$orderId}.");
    exit;
}
$expected = (float) $order['amount'];
$received = isset($data['amount_gross']) ? (float) $data['amount_gross'] : -1;
if (abs($expected - $received) > 0.01) {
    $log("Amount mismatch for {$orderId}: expected {$expected}, got {$received}.");
    exit;
}

// ---- Check 4: server-to-server confirmation --------------------------------
if (!pf_server_confirm($data, $cfg['sandbox'])) {
    $log("Server confirmation FAILED for {$orderId}.");
    exit;
}

// ---- Payment status --------------------------------------------------------
$status = isset($data['payment_status']) ? $data['payment_status'] : '';
if ($status !== 'COMPLETE') {
    $log("Status '{$status}' for {$orderId} — recorded, not fulfilling.");
    $order['status'] = strtolower($status ?: 'unknown');
    $order['pf_data'] = $data;
    pf_save_order($orderId, $order);
    exit;
}

// ---- Idempotency: already handled? -----------------------------------------
if (isset($order['status']) && $order['status'] === 'paid') {
    $log("Duplicate ITN for {$orderId} — already paid, skipped.");
    exit;
}

// ---- Mark paid + notify ----------------------------------------------------
$order['status']  = 'paid';
$order['paid_at'] = date('c');
$order['pf_payment_id'] = isset($data['pf_payment_id']) ? $data['pf_payment_id'] : '';
$order['pf_data'] = $data;
pf_save_order($orderId, $order);

$s = $order['shipping'];
$body =
    "A HOMME pre-order has been PAID.\n\n" .
    "Order reference: {$orderId}\n" .
    "PayFast payment id: {$order['pf_payment_id']}\n" .
    "Paid at: {$order['paid_at']}\n\n" .
    "Edition: {$order['edition_name']}\n" .
    "Quantity: {$order['quantity']}\n" .
    "Amount: R{$order['amount']}\n\n" .
    "Buyer\n" .
    "  Name:  {$order['buyer']['name']}\n" .
    "  Email: {$order['buyer']['email']}\n" .
    "  Phone: {$order['buyer']['phone']}\n\n" .
    "Ship to\n" .
    "  {$s['line1']}\n" .
    ($s['line2'] !== '' ? "  {$s['line2']}\n" : '') .
    "  {$s['city']}, {$s['province']} {$s['postal']}\n" .
    "  {$s['country']}\n";

$fromDomain = parse_url($cfg['site_url'], PHP_URL_HOST) ?: 'matthewwillman.com';
$headers = "From: HOMME Orders <no-reply@{$fromDomain}>\r\n" .
           "Reply-To: {$order['buyer']['email']}\r\n" .
           "Content-Type: text/plain; charset=utf-8\r\n";

@mail($cfg['merchant_email'], "HOMME pre-order PAID — {$order['edition_name']}", $body, $headers);

if (!empty($cfg['email_buyer'])) {
    $buyerBody =
        "Dear {$order['buyer']['name']},\n\n" .
        "Thank you for your HOMME pre-order. We have received your payment.\n\n" .
        "Order reference: {$orderId}\n" .
        "Edition: {$order['edition_name']}\n" .
        "Quantity: {$order['quantity']}\n" .
        "Amount: R{$order['amount']}\n\n" .
        "We will be in touch regarding dispatch. If you have any questions, reply to this email.\n\n" .
        "Matthew Willman Photography\n";
    $buyerHeaders = "From: Matthew Willman Photography <no-reply@{$fromDomain}>\r\n" .
                    "Reply-To: {$cfg['merchant_email']}\r\n" .
                    "Content-Type: text/plain; charset=utf-8\r\n";
    @mail($order['buyer']['email'], 'Your HOMME pre-order confirmation', $buyerBody, $buyerHeaders);
}

$log("Order {$orderId} PAID and emailed.");
exit;
