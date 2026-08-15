<?php
// -----------------------------------------------------------------------------
// Maintenance script: delete abandoned PENDING pre-orders older than N days
// (default 30, set via 'purge_pending_days' in config.php). Paid orders - and
// anything that is not 'pending' - are NEVER touched.
//
// Run it daily with a cron job. On xneelo (konsoleH -> Cron Jobs) use either:
//
//   CLI:  php /home/<account>/public_html/pay/purge.php
//   URL:  wget -qO- "https://<your-site>/pay/purge.php?token=YOUR_TOKEN"
//
// The URL form only works when 'purge_token' is set in config.php; without a
// token the script is CLI-only and a browser request just gets a 404, so the
// public can neither trigger it nor read its output.
//
// Preview without deleting:  php purge.php --dry-run   (or &dry=1 on the URL)
// -----------------------------------------------------------------------------

require __DIR__ . '/common.php';

$cfg   = pf_config();
$days  = isset($cfg['purge_pending_days']) ? (int) $cfg['purge_pending_days'] : 30;
$isCli = (PHP_SAPI === 'cli');

// ---- Access control (HTTP requires the secret token) -----------------------
if (!$isCli) {
    $token = isset($cfg['purge_token']) ? (string) $cfg['purge_token'] : '';
    $given = isset($_GET['token']) ? (string) $_GET['token'] : '';
    if ($token === '' || !hash_equals($token, $given)) {
        http_response_code(404); // don't reveal that the endpoint exists
        exit;
    }
    header('Content-Type: text/plain; charset=utf-8');
}

// ---- Dry run? --------------------------------------------------------------
$dryRun = $isCli
    ? in_array('--dry-run', $argv, true)
    : (isset($_GET['dry']) && $_GET['dry'] === '1');

$ids  = pf_purge_pending($days, $dryRun);
$verb = $dryRun ? 'Would delete' : 'Deleted';
$msg  = "{$verb} " . count($ids) . " abandoned pending order(s) older than {$days} days"
      . (count($ids) > 0 ? ': ' . implode(', ', $ids) : '.');

// Log real runs, and let the opportunistic purge know one just happened.
if (!$dryRun) {
    @file_put_contents(pf_orders_dir() . '/purge.log', '[' . date('c') . '] ' . $msg . "\n", FILE_APPEND | LOCK_EX);
    @file_put_contents(pf_purge_marker(), (string) time(), LOCK_EX);
}

echo $msg . "\n";
