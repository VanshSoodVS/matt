// Banking details shown on the checkout page for EFT / bank-transfer payments
// (South African customers only). Bank details for RECEIVING money are not
// secret, so it's fine for these to ship in the site.
//
// >>> REPLACE the placeholder values below with the real account details. <<<

export const ORDERS_EMAIL = "matthew@matthewwillman.co.za";

export const BANKING = {
  accountHolder: "«ACCOUNT HOLDER»",
  bank: "«BANK NAME»",
  accountNumber: "«ACCOUNT NUMBER»",
  branchCode: "«BRANCH CODE»",
  accountType: "«ACCOUNT TYPE (e.g. Cheque / Current)»",
  reference: "Your full name",
};
