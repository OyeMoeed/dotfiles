/**
 * Defines all possible Edit SADAD types.
 */
enum SadadBillType {
  BILL_NICK_NAME = 'bill',
  SERVICE_PROVIDER = 'provider',
  SERVICE_TYPE = 'service',
  ACCOUNT_NUMBER = 'account',
}

enum SadadEditBillFields {
  BILL_NICK_NAME = 'billName',
  SERVICE_PROVIDER = 'companyName',
  SERVICE_TYPE = 'serviceType',
  ACCOUNT_NUMBER = 'accountNumber',
}

export { SadadBillType, SadadEditBillFields };
