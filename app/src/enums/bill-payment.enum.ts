/**
 * Defines all possible Sadad bill types.
 */
enum NewSadadBillType {
  COMPANY_NAME = 'company',
  SERVICE_TYPE = 'service',
  ALL_COMPANY = 'All',
}

enum FormFields {
  COMPANY_NAME = 'companyName',
  SERVICE_TYPE = 'serviceType',
  ACCOUNT_NUMBER = 'accountNumber',
  BILL_NAME = 'billName',
  SAVE_BILL = 'saveBill',
}

enum AccountBalanceStatus {
  INSUFFICIENT_BALANCE = 'insufficient',
  ACCOUNT_BALANCE = 'accountBalance',
  NO_REMAINING_AMOUNT = 'noRemainingAmount',
}

export { AccountBalanceStatus, FormFields, NewSadadBillType };
