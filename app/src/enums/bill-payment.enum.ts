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
  NO_REMAINING_AMOUNT = 'noRemainingAmount',
  MONTHLY_INCOMING_LIMIT = 'monthlyIncomingLimit',
  MONTHLY_OUTGOING_LIMIT = 'monthlyOutgoingLimit',
  DAILY_INCOMING_LIMIT = 'dailyIncomingLimit',
  DAILY_OUTGOING_LIMIT = 'dailyOutgoingLimit',
  MONTHLY_REMAINING_INCOMING_AMOUNT = 'monthlyRemainingIncomingAmount',
  MONTHLY_REMAINING_OUTGOING_AMOUNT = 'monthlyRemainingOutgoingAmount',
  DAILY_REMAINING_INCOMING_AMOUNT = 'dailyRemainingIncomingAmount',
  DAILY_REMAINING_OUTGOING_AMOUNT = 'dailyRemainingOutgoingAmount',
  SPENDING_LIMIT_EXCEED = 'spendingLimitExceed',
}

export { AccountBalanceStatus, FormFields, NewSadadBillType };
