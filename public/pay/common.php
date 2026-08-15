<?php
// -----------------------------------------------------------------------------
// Shared PayFast helpers: config loading, signature generation/verification,
// ITN validation, and order-record storage.
//
// Signature + ITN logic follows PayFast's official integration spec. Keep this
// file free of any secrets - those live only in config.php.
// -----------------------------------------------------------------------------

/** Load server config (config.php). Fails closed if it is missing. */
function pf_config()
{
    static $cfg = null;
    if ($cfg === null) {
        $path = __DIR__ . '/config.php';
        if (!is_file($path)) {
            http_response_code(500);
            exit('Payment configuration missing.');
        }
        $cfg = require $path;
    }
    return $cfg;
}

/** PayFast host for the current mode. */
function pf_host($sandbox)
{
    return $sandbox ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
}

function pf_process_url($sandbox)
{
    return 'https://' . pf_host($sandbox) . '/eng/process';
}

function pf_validate_url($sandbox)
{
    return 'https://' . pf_host($sandbox) . '/eng/query/validate';
}

/**
 * Build the PayFast parameter string from an ordered map.
 * Values are trimmed and URL-encoded (spaces -> '+', matching PayFast).
 * `signature` is always skipped. The passphrase, if set, is appended last.
 */
function pf_param_string(array $data, $passphrase = '')
{
    $pairs = [];
    foreach ($data as $key => $val) {
        if ($key === 'signature') {
            continue;
        }
        if ($val === '' || $val === null) {
            continue;
        }
        $pairs[] = $key . '=' . urlencode(trim((string) $val));
    }
    $str = implode('&', $pairs);
    if ($passphrase !== '' && $passphrase !== null) {
        $str .= '&passphrase=' . urlencode(trim($passphrase));
    }
    return $str;
}

/** Generate the md5 signature for a request/notification. */
function pf_signature(array $data, $passphrase = '')
{
    return md5(pf_param_string($data, $passphrase));
}

/**
 * Build the ITN parameter string EXACTLY the way PayFast does when it signs a
 * notification: every posted field except `signature`, in the order received,
 * url-encoded - WITHOUT skipping empty values and WITHOUT trimming (this is the
 * key difference from the request-signing path, which we control and where we
 * strip empties ourselves).
 */
function pf_itn_param_string(array $postData)
{
    $pairs = [];
    foreach ($postData as $key => $val) {
        if ($key === 'signature') {
            continue;
        }
        $pairs[] = $key . '=' . urlencode((string) $val);
    }
    return implode('&', $pairs);
}

/**
 * Verify an ITN signature. Tries the passphrase-appended string first (a live
 * account with a security passphrase set), then falls back to no passphrase
 * (the PayFast sandbox is known to sign some ITNs without one). Either way the
 * server-to-server confirmation in notify.php remains the authoritative check.
 */
function pf_valid_signature(array $postData, $passphrase = '')
{
    $signature = isset($postData['signature']) ? $postData['signature'] : '';
    $base = pf_itn_param_string($postData);

    if ($passphrase !== '' && $passphrase !== null) {
        $withPass = md5($base . '&passphrase=' . urlencode($passphrase));
        if (hash_equals($withPass, $signature)) {
            return true;
        }
    }
    return hash_equals(md5($base), $signature);
}

/**
 * RFC 2047-encode a mail header value so non-ASCII characters (e.g. an em dash
 * in a subject) are transmitted safely. Falls back to stripping non-ASCII if
 * the mbstring extension is unavailable.
 */
function pf_encode_header($text)
{
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($text, 'UTF-8', 'B', "\r\n");
    }
    return preg_replace('/[^\x20-\x7E]/', '-', $text);
}

/** Check the caller's IP resolves to a known PayFast host. */
function pf_valid_ip($remoteIp)
{
    $validHosts = [
        'www.payfast.co.za',
        'sandbox.payfast.co.za',
        'w1w.payfast.co.za',
        'w2w.payfast.co.za',
    ];
    $validIps = [];
    foreach ($validHosts as $host) {
        $ips = gethostbynamel($host);
        if ($ips !== false) {
            $validIps = array_merge($validIps, $ips);
        }
    }
    return in_array($remoteIp, array_unique($validIps), true);
}

/**
 * Server-to-server confirmation: POST the received data back to PayFast and
 * require a "VALID" response. Uses the raw received param string (no passphrase,
 * no re-encoding surprises) per PayFast's guidance.
 */
function pf_server_confirm(array $postData, $sandbox)
{
    $pairs = [];
    foreach ($postData as $key => $val) {
        if ($key === 'signature') {
            continue;
        }
        $pairs[] = $key . '=' . urlencode(trim((string) $val));
    }
    $paramString = implode('&', $pairs);

    $ch = curl_init(pf_validate_url($sandbox));
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $paramString,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
    ]);
    $response = curl_exec($ch);
    curl_close($ch);

    return $response !== false && strcmp(trim($response), 'VALID') === 0;
}

/** Resolve the orders directory, creating it if needed. */
function pf_orders_dir()
{
    $cfg = pf_config();
    $dir = $cfg['orders_dir'];
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    return $dir;
}

/** Generate a unique order reference (m_payment_id). */
function pf_order_id()
{
    return 'MW-' . date('YmdHis') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
}

function pf_order_path($id)
{
    // Basic hardening: only allow our own id charset.
    $safe = preg_replace('/[^A-Za-z0-9\-]/', '', $id);
    return pf_orders_dir() . '/' . $safe . '.json';
}

function pf_save_order($id, array $data)
{
    file_put_contents(pf_order_path($id), json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);
}

function pf_load_order($id)
{
    $path = pf_order_path($id);
    if (!is_file($path)) {
        return null;
    }
    return json_decode(file_get_contents($path), true);
}

// -----------------------------------------------------------------------------
// Maintenance: purge abandoned (never-paid) pre-orders. See purge.php.
// -----------------------------------------------------------------------------

/** Path to the throttle marker used by the opportunistic purge. */
function pf_purge_marker()
{
    return pf_orders_dir() . '/.last_purge';
}

/**
 * Delete PENDING order records older than $maxAgeDays. Orders that reached any
 * other status (paid, cancelled, ...) are NEVER touched, and files we cannot
 * parse are left alone. Returns the list of affected order ids; with
 * $dryRun = true nothing is deleted (preview only).
 */
function pf_purge_pending($maxAgeDays = 30, $dryRun = false)
{
    $dir    = pf_orders_dir();
    $cutoff = time() - ((int) $maxAgeDays * 86400);
    $ids    = [];

    foreach (glob($dir . '/*.json') ?: [] as $path) {
        $raw = @file_get_contents($path);
        if ($raw === false) {
            continue;
        }
        $order = json_decode($raw, true);
        // Only ever touch well-formed records that are still pending.
        if (!is_array($order) || (isset($order['status']) ? $order['status'] : '') !== 'pending') {
            continue;
        }
        // Age from the recorded created time, falling back to the file mtime.
        $created = isset($order['created']) ? strtotime($order['created']) : false;
        if ($created === false) {
            $created = @filemtime($path);
        }
        if ($created === false || $created > $cutoff) {
            continue; // unknown age, or still inside the retention window
        }
        if (!$dryRun) {
            @unlink($path);
        }
        $ids[] = isset($order['m_payment_id']) ? $order['m_payment_id'] : basename($path, '.json');
    }

    return $ids;
}

/**
 * Opportunistic version for the request path: runs pf_purge_pending() at most
 * once every 24h and can never interrupt the caller (all failures swallowed).
 * A dedicated cron running purge.php is preferred; this keeps the orders folder
 * tidy even when no cron is configured.
 */
function pf_maybe_purge_pending($maxAgeDays = 30)
{
    $marker = pf_purge_marker();
    $last   = is_file($marker) ? (int) @file_get_contents($marker) : 0;
    if ((time() - $last) < 86400) {
        return;
    }
    // Claim the slot up front so concurrent requests don't all purge at once.
    @file_put_contents($marker, (string) time(), LOCK_EX);
    try {
        pf_purge_pending($maxAgeDays, false);
    } catch (\Throwable $e) {
        // Housekeeping must never break checkout.
    }
}
