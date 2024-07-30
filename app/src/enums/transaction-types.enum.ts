/**
 * Defines all possible transaction types.
 */
enum TransactionTypes {
  SEND_MONEY = 'send_money',
  RECEIVED_MONEY = 'received_money',
  PAY_BILL = 'PAY_BILL',
  COUT_EXPRESS = 'COUT_EXPRESS',
  CIN_CASH_BACK = 'CIN_CASH_BACK',
  VISA_SIGNATURE_CARD_INSURANCE = 'visa_signature_card_issuance',
  ATM = 'atm',
  BKF_TRANSFER = 'BKF_TRANSFER',
  APPLE_PAY_TOP_UP = 'apple_pay_topup',
  TRANSFER_SEND_MONEY = 'transfer_send_money',
  TRANSFER_RECEIVED_MONEY = 'transfer_received_money',
}

enum TransactionOperations {
  DEBIT = 'DR',
  CREDIT = 'CR',
}

enum TransactionHideItems {
  NAME = 'name',
  AMOUNT = 'amount',
}

enum LocalizationKeys {
  TRANSACTION_TYPE = 'transaction_type',
}

enum CopiableKeys {
  REF_NUMBER = 'transactionRefNumber',
}

enum KeysToProcess {
  VAT = 'vatAmount',
  TRANSACTION_DATE = 'transactionDateTime',
  TRANSFER_BY = 'transfer_by',
}

enum LocalizationKeysMapping {
  name = 'NAME',
  transactionRequestType = 'TRANSACTION_TYPE',
  type = 'TYPE',
  amount = 'AMOUNT',
  senderName = 'SENDER',
  receiver = 'RECEIVER',
  transfer_reason = 'TRANSFER_REASON',
  note = 'NOTE',
  transactionRefNumber = 'REF_NUMBER',
  transactionDateTime = 'TRANSACTION_DATE',
  cardType = 'CARD',
  merchant_name = 'MERCHANT_NAME',
  feesAmount = 'FEE',
  vatAmount = 'VAT',
  acquire_country = 'ACQUIRE_COUNTRY',
  atm_location = 'ATM_LOCATION',
  atm_type = 'ATM_WITHDRAWALS_TYPE',
  bankName = 'BANK_NAME',
  iban = 'RECEIVERS_IBAN',
  senders_iban = 'SENDERS_IBAN',
  send_money = 'SEND_MONEY',
  received_money = 'RECEIVED_MONEY',
  PAY_BILL = 'POS_PURCHASE',
  COUT_EXPRESS = 'E_COMMERCE',
  CIN_CASH_BACK = 'CASHBACK',
  visa_signature_card_issuance = 'VISA_SIGNATURE_CARD_INSURANCE',
  atm = 'ATM',
  BKF_TRANSFER = 'LOCAL_TRANSFER',
  apple_pay_topup = 'APPLE_PAY_TOP_UP',
  send_money_type = 'SEND_MONEY_TYPE',
  received_money_type = 'RECEIVED_MONEY_TYPE',
  e_commerce_type = 'E_COMMERCE_TYPE',
  cash_back_type = 'CASHBACK_TYPE',
  visa_signature_card_issuance_type = 'VISA_SIGNATURE_CARD_INSURANCE_TYPE',
  local_transfer_type = 'LOCAL_TRANSFER_TYPE',
  apple_pay_topup_type = 'APPLE_PAY_TOP_UP_TYPE',
  atm_transaction = 'ATM_TYPE',
  pos_purchase_type = 'POS_PURCHASE_TYPE',
  beneficiaryName = 'BENEFICIARY_NICK_NAME',
  transfer_by = 'TRANSFER_BY',
  total_amount = 'TOTAL_AMOUNT',
  sender_nick_name = 'SENDER_NICK_NAME',
  bank_image = '',
  bank_account_no = 0,
}

export {
  CopiableKeys,
  KeysToProcess,
  LocalizationKeys,
  LocalizationKeysMapping,
  TransactionHideItems,
  TransactionOperations,
  TransactionTypes,
};
