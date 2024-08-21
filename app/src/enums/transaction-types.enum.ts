/**
 * Defines all possible transaction types.
 */

enum TransactionTypes {
  SEND_MONEY = 'send_money',
  RECEIVED_MONEY = 'received_money',
  PAY_BILL = 'PAY_BILL',
  COUT_EXPRESS = 'COUT_EXPRESS',
  VISA_SIGNATURE_CARD_INSURANCE = 'visa_signature_card_issuance',
  ATM = 'atm',
  LOCAL_TRANSFER = 'local_transfer',
  APPLE_PAY_TOP_UP = 'apple_pay_topup',
  INTERNATIONAL_TRANSFER = 'international_transfer',
  CASH_PICKUP = 'cash_pickup',
  BANK_TRANSFER = 'bank_transfer',
  SEND_GIFT = 'Send_Gift',
  TRANSFER_SEND_MONEY = 'transfer_send_money',
  COUT_SARIE = 'COUT_SARIE',
  COUT_MUSANED = 'COUT_MUSANED',
  CIN_MUSANED = 'CIN_MUSANED',
  PAY_WALLET = 'PAY_WALLET',
  COUT_ATM = 'COUT_ATM',
  COUT_WU = 'COUT_WU',
  COUT_ALINMA = 'COUT_ALINMA',
  CIN_ALINMA = 'CIN_ALINMA',
  PAY_MRCHNT_IN = 'PAY_MRCHNT_IN',
  PAY_MRCHNT_OUT = 'PAY_MRCHNT_OUT',
  PAY_MRCHNT_BILL = 'PAY_MRCHNT_BILL',
  REFUND = 'REFUND',
  PAYMENT_REQUEST = 'PAYMENT_REQUEST',
  CIN_CARD = 'CIN_CARD',
  CIN_CARD_MADA = 'CIN_CARD_MADA',
  CIN_CARD_VISA = 'CIN_CARD_VISA',
  CIN_CARD_VISA_APAY = 'CIN_CARD_VISA_APAY',
  CIN_CARD_MASTER = 'CIN_CARD_MASTER',
  CIN_WU_REV = 'CIN_WU_REV',
  CIN_SARIE = 'CIN_SARIE',
  COUT_IPS = 'COUT_IPS',
  CARD_ISSUE = 'CARD_ISSUE',
  CARD_REISSUE = 'CARD_REISSUE',
  CARD_REPLACE = 'CARD_REPLACE',
  PAY_VCARD = 'PAY_VCARD',
  PAY_VCARD_POS = 'PAY_VCARD_POS',
  PAY_VCARD_ECOM = 'PAY_VCARD_ECOM',
  PAY_VCARD_SETTLE = 'PAY_VCARD_SETTLE',
  PAY_MOI = 'PAY_MOI',
  BKF_TRANSFER = 'BKF_TRANSFER',
  CIN_SARIE_REV = 'CIN_SARIE_REV',
  CIN_WALLET = 'CIN_WALLET',
  CIN_CASH_BACK = 'CIN_CASH_BACK',
  CIN_EXPRESS_REV = 'CIN_EXPRESS_REV',
  PAY_VCARD_REFUND = 'PAY_VCARD_REFUND',
  COUT_GIFT = 'COUT_GIFT',
  PAY_VCARD_POS_MADA = 'PAY_VCARD_POS_MADA',
  PAY_VCARD_POS_VISA = 'PAY_VCARD_POS_VISA',
  PAY_VCARD_POS_NAQD_MADA = 'PAY_VCARD_POS_NAQD_MADA',
  PAY_VCARD_POS_NAQD_VISA = 'PAY_VCARD_POS_NAQD_VISA',
  PAY_VCARD_POS_NAQD = 'PAY_VCARD_POS_NAQD',
  PAY_VCARD_ECOM_MADA = 'PAY_VCARD_ECOM_MADA',
  PAY_VCARD_ECOM_VISA = 'PAY_VCARD_ECOM_VISA',
  COUT_ALINMA_REV = 'COUT_ALINMA_REV',
  COUT_SARIE_REV = 'COUT_SARIE_REV',
  COUT_SWIFT_REV = 'COUT_SWIFT_REV',
  REFUND_SADAD_REV = 'REFUND_SADAD_REV',
  CASHBACK = 'CASHBACK',
  CIN_VISA_CASHBACK = 'CIN_VISA_CASHBACK',
  CIN_CARD_MADA_APAY = 'CIN_CARD_MADA_APAY',
  CIN_CARD_MASTER_APAY = 'CIN_CARD_MASTER_APAY',
  PAY_ONECARD = 'PAY_ONECARD',
  PAY_VCARD_REFUND_REV = 'PAY_VCARD_REFUND_REV',
  CIN_MAZAYA = 'CIN_MAZAYA',
  CARD_VCB_REPLACE = 'CARD_VCB_REPLACE',
  COUT_MOBILE = 'COUT_MOBILE',
  TRANSFER_RECEIVED_MONEY = 'transfer_received_money',
  CR = 'CR',
  DR = 'DR',
  CIN_VISA_CASHBACK_REV = 'CIN_VISA_CASHBACK_REV',
  CARD_VCB_ISSUE = 'CARD_VCB_ISSUE'
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

enum Countires {
  PAKISTAN = 'pakistan',
  EGYPT = 'egypt',
}

enum LocalizationKeysMapping {
  name = 'NAME',
  transactionType = 'TRANSACTION_TYPE',
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
  beneficiaryName = 'BENEFICIARY_NICK_NAME',
  transfer_by = 'TRANSFER_BY',
  total_amount = 'TOTAL_AMOUNT',
  sender_nick_name = 'SENDER_NICK_NAME',
  bankImage = '',
  bank_account_no = 0,
}

export {
  CopiableKeys,
  Countires,
  KeysToProcess,
  LocalizationKeys,
  LocalizationKeysMapping,
  TransactionHideItems,
  TransactionMedium,
  TransactionOperations,
  TransactionTypes,
  TransactionsStatus
};

