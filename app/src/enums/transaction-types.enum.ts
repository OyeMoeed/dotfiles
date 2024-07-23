/**
 * Defines all possible transaction types.
 */
enum TransactionTypes {
  SEND_MONEY = 'send_money',
  RECEIVED_MONEY = 'received_money',
  POS_PURCHASE = 'pos_purchase',
  E_COMMERCE = 'e_commerce',
  CASHBACK = 'cash_back',
  VISA_SIGNATURE_CARD_INSURANCE = 'visa_signature_card_issuance',
  ATM = 'atm',
  LOCAL_TRANSFER = 'local_transfer',
  APPLE_PAY_TOP_UP = 'apple_pay_topup',
  INTERNATIONAL_TRANSFER = 'international_transfer',
  CASH_PICKUP = 'cash_pickup',
  BANK_TRANSFER = 'bank_transfer',
}

enum TransactionOperations {
  DEBIT = 'DE',
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
  REF_NUMBER = 'ref_number',
}

enum KeysToProcess {
  VAT = 'vat',
  TRANSACTION_DATE = 'transaction_date',
}

enum TransactionsStatus {
  PAID = 'paid',
  REFUND = 'refund',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

enum TransactionMedium {
  WESTERN_UNION = 'western_union',
  ALINMAPAY_DIRECT = 'alinmapay_direct',
}

enum LocalizationKeysMapping {
  name = 'NAME',
  transactionType = 'TRANSACTION_TYPE',
  type = 'TYPE',
  amount = 'AMOUNT',
  sender = 'SENDER',
  receiver = 'RECEIVER',
  transfer_reason = 'TRANSFER_REASON',
  note = 'NOTE',
  ref_number = 'REF_NUMBER',
  transaction_date = 'TRANSACTION_DATE',
  card = 'CARD',
  merchant_name = 'MERCHANT_NAME',
  fee = 'FEE',
  vat = 'VAT',
  acquire_country = 'ACQUIRE_COUNTRY',
  atm_location = 'ATM_LOCATION',
  atm_type = 'ATM_WITHDRAWALS_TYPE',
  bank_name = 'BANK_NAME',
  receivers_iban = 'RECEIVERS_IBAN',
  senders_iban = 'SENDERS_IBAN',
  send_money = 'SEND_MONEY',
  received_money = 'RECEIVED_MONEY',
  pos_purchase = 'POS_PURCHASE',
  e_commerce = 'E_COMMERCE',
  cash_back = 'CASHBACK',
  visa_signature_card_issuance = 'VISA_SIGNATURE_CARD_INSURANCE',
  atm = 'ATM',
  local_transfer = 'LOCAL_TRANSFER',
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
  international_transfer = 'INTERNATIONAL_TRANSFER',
  cash_pickup = 'CASH_PICKUP',
  bank_transfer = 'BANK_TRANSFER',
  western_union = 'WESTERN_UNION',
  alinmapay_direct = 'ALINMAPAY_DIRECT',
  paid = 'PAID',
  refund = 'REFUND',
  rejected = 'REJECTED',
  pending = 'PENDING',
  CR = 'CREDIT',
  DE = 'DEBIT',
}

export {
  CopiableKeys,
  KeysToProcess,
  LocalizationKeys,
  LocalizationKeysMapping,
  TransactionHideItems,
  TransactionMedium,
  TransactionOperations,
  TransactionTypes,
  TransactionsStatus,
};
