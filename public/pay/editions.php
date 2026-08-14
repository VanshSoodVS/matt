<?php
// AUTHORITATIVE charge amounts (ZAR) for PayFast.
//
// This is the price authority — initiate.php and notify.php read the amount
// from HERE, never from the browser, so a tampered client cannot change what
// is charged. Mirror of src/data/editions.js — keep the slugs and amounts in
// sync with that file.

return [
    'collectors-slipcase' => [
        'name'   => "HOMME - Collector's Slipcase Edition",
        'amount' => '3450.00', // ZAR, 2 decimals (PayFast format)
    ],
    'signed-first' => [
        'name'   => 'HOMME - Signed First Edition',
        'amount' => '2850.00',
    ],
];
