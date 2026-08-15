<?php
// -----------------------------------------------------------------------------
// Step 1 of checkout: receive the buyer's details from the React checkout form,
// look up the AUTHORITATIVE price server-side, sign the PayFast request, record
// a pending order, and hand the browser off to PayFast via an auto-submit form.
//
// The amount is NEVER taken from the client - only the edition slug is trusted,
// and the price comes from editions.php.
// -----------------------------------------------------------------------------

require __DIR__ . '/common.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed.');
}

$cfg      = pf_config();
$editions = require __DIR__ . '/editions.php';

// Opportunistic housekeeping: at most once a day, delete abandoned (never-paid)
// pre-orders. A cron running purge.php is the primary trigger; this is a safe
// no-cron fallback and can never affect the checkout below.
pf_maybe_purge_pending((int) (isset($cfg['purge_pending_days']) ? $cfg['purge_pending_days'] : 30));

// ---- Read + validate input -------------------------------------------------
$post = function ($k) {
    return isset($_POST[$k]) ? trim((string) $_POST[$k]) : '';
};

$slug = $post('edition');
if (!isset($editions[$slug])) {
    http_response_code(400);
    exit('Unknown edition.');
}

$qty = (int) $post('quantity');
if ($qty < 1) { $qty = 1; }
if ($qty > 5) { $qty = 5; } // keep in sync with the quantity options in src/pages/Checkout.jsx

// Delivery region decides the price tier (PayFast is ZAR-only, so international
// buyers pay a higher FIXED ZAR amount). Only 'intl' or 'sa' are accepted.
$region = ($post('region') === 'intl') ? 'intl' : 'sa';

$fullName = $post('full_name');
$email    = filter_var($post('email'), FILTER_VALIDATE_EMAIL);
if ($fullName === '' || $email === false) {
    http_response_code(400);
    exit('Name and a valid email are required.');
}

// Split full name into first / last for PayFast's fields.
$nameParts = preg_split('/\s+/', $fullName, 2);
$nameFirst = $nameParts[0];
$nameLast  = isset($nameParts[1]) ? $nameParts[1] : '';

$address = [
    'line1'    => $post('address_line1'),
    'line2'    => $post('address_line2'),
    'city'     => $post('city'),
    'province' => $post('province'),
    'postal'   => $post('postal_code'),
    'country'  => $post('country'),
];
$phone = $post('phone');

// ---- Amount (authoritative, server-side) -----------------------------------
// Price comes from editions.php by region - never from the client.
$unitField = ($region === 'intl' && isset($editions[$slug]['amount_intl']))
    ? $editions[$slug]['amount_intl']
    : $editions[$slug]['amount'];
$unit   = (float) $unitField;
$amount = number_format($unit * $qty, 2, '.', '');
$itemName = $editions[$slug]['name'] . ($qty > 1 ? " x{$qty}" : '');

// ---- Order reference + pending record --------------------------------------
$orderId = pf_order_id();
$order = [
    'm_payment_id' => $orderId,
    'status'       => 'pending',
    'created'      => date('c'),
    'edition_slug' => $slug,
    'edition_name' => $editions[$slug]['name'],
    'quantity'     => $qty,
    'region'       => $region,
    'amount'       => $amount,
    'buyer' => [
        'name'  => $fullName,
        'email' => $email,
        'phone' => $phone,
    ],
    'shipping' => $address,
];
pf_save_order($orderId, $order);

// ---- Build PayFast fields (order matters for the signature) ----------------
$shipSummary = trim(sprintf(
    '%s, %s, %s %s, %s',
    $address['line1'],
    $address['city'],
    $address['province'],
    $address['postal'],
    $address['country']
), ', ');

$pfData = [
    'merchant_id'   => $cfg['merchant_id'],
    'merchant_key'  => $cfg['merchant_key'],
    'return_url'    => $cfg['site_url'] . '/order-complete?m_payment_id=' . rawurlencode($orderId),
    'cancel_url'    => $cfg['site_url'] . '/order-cancelled',
    'notify_url'    => $cfg['site_url'] . '/pay/notify.php',
    'name_first'    => $nameFirst,
    'name_last'     => $nameLast,
    'email_address' => $email,
    'm_payment_id'  => $orderId,
    'amount'        => $amount,
    'item_name'     => $itemName,
    'item_description' => 'HOMME limited edition pre-order',
    // Reference info surfaced in the PayFast dashboard (full record is in the order file).
    'custom_str1'   => substr('Ship to: ' . $fullName . ' - ' . $shipSummary, 0, 255),
    'custom_str2'   => substr('Phone: ' . $phone, 0, 255),
    // PayFast also emails the merchant on payment as a backstop to our ITN email.
    'email_confirmation'   => '1',
    'confirmation_address' => $cfg['merchant_email'],
];

// Drop empties so the signed order matches exactly what we POST.
$pfData = array_filter($pfData, static function ($v) {
    return $v !== '' && $v !== null;
});

$pfData['signature'] = pf_signature($pfData, $cfg['passphrase']);

$processUrl = pf_process_url($cfg['sandbox']);

// ---- Auto-submit form to PayFast -------------------------------------------
header('Content-Type: text/html; charset=utf-8');
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redirecting to secure payment…</title>
  <style>
    body { font-family: "Gill Sans MT", "Gill Sans", Calibri, sans-serif; background:#fff;
           color:#222; display:flex; min-height:100vh; align-items:center; justify-content:center;
           margin:0; text-align:center; }
    .msg { max-width:360px; padding:24px; }
  </style>
</head>
<body>
  <form id="pf" action="<?php echo htmlspecialchars($processUrl, ENT_QUOTES); ?>" method="post">
    <?php foreach ($pfData as $name => $value) : ?>
      <input type="hidden" name="<?php echo htmlspecialchars($name, ENT_QUOTES); ?>" value="<?php echo htmlspecialchars($value, ENT_QUOTES); ?>">
    <?php endforeach; ?>
    <div class="msg">
      <p>Redirecting you to PayFast’s secure payment page…</p>
      <noscript><button type="submit">Continue to payment</button></noscript>
    </div>
  </form>
  <script>document.getElementById('pf').submit();</script>
</body>
</html>
