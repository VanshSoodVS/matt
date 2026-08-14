<?php
// -----------------------------------------------------------------------------
// PayFast configuration.
//
// SETUP: copy this file to `config.php` ON THE SERVER and fill in your real
// credentials. `config.php` is git-ignored and must NEVER be committed — it
// holds the passphrase. Because it is a .php file, Apache executes it and
// never serves its source, but keep it out of the repo regardless.
//
// Credentials come from the PayFast dashboard -> Settings -> Integration.
// The passphrase must EXACTLY match the "Security passphrase" set there.
// -----------------------------------------------------------------------------

return [
    // true  = PayFast sandbox (test payments, no real money)
    // false = live payments
    'sandbox'        => true,

    'merchant_id'    => 'YOUR_MERCHANT_ID',
    'merchant_key'   => 'YOUR_MERCHANT_KEY',
    'passphrase'     => 'YOUR_SECURITY_PASSPHRASE',

    // Where confirmed orders are emailed for fulfilment.
    'merchant_email' => 'matthew@matthewwillman.co.za',

    // Canonical site origin (used to build return / cancel / notify URLs).
    'site_url'       => 'https://www.matthewwillman.com',

    // Where order records are written. IDEALLY point this ABOVE the web root so
    // the JSON files are never downloadable, e.g. __DIR__ . '/../../mw-private/orders'.
    // If it must stay under the web root, orders/.htaccess denies HTTP access.
    'orders_dir'     => __DIR__ . '/orders',

    // Send the buyer a simple confirmation email too (in addition to PayFast's).
    'email_buyer'    => true,

    // --- Maintenance (see pay/purge.php) -----------------------------------
    // Abandoned pre-orders (submitted but never paid) are deleted after this
    // many days. Paid orders are kept indefinitely.
    'purge_pending_days' => 30,

    // Optional secret to allow triggering purge.php over HTTPS from a URL-based
    // cron: /pay/purge.php?token=THIS. Leave empty to keep purge.php CLI-only.
    'purge_token'        => '',
];
