<?php
// -----------------------------------------------------------------------------
// Shared PayFast helpers: config loading, signature generation/verification,
// ITN validation, and order-record storage.
//
// Signature + ITN logic follows PayFast's official integration spec. Keep this
// file free of any secrets — those live only in config.php.
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
 * Verify an ITN signature. PayFast expects the string rebuilt from the POSTed
 * fields IN THE ORDER RECEIVED (PHP preserves $_POST order), excluding the
 * signature field, with the passphrase appended.
 */
function pf_valid_signature(array $postData, $passphrase = '')
{
    $signature = isset($postData['signature']) ? $postData['signature'] : '';
    $calculated = pf_signature($postData, $passphrase);
    return hash_equals($calculated, $signature);
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
