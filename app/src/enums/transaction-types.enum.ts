/**
 * Defines all possible transaction types.
 */
enum transactionTypes {
  SEND_MONEY = 'send_money',
  RECEIVED_MONEY = 'received_money',
  POS_PURCHASE = 'pos_purchase',
  E_COMMERCE = 'e_commerce',
  CASHBACK = 'cashback',
  VISA_SIGNATURE_CARD_INSURANCE = 'visa_signature_card_issuance',
  ATM = 'atm',
  LOCAL_TRANSFER = 'local_transfer',
  APPLE_PAY_TOP_UP = 'apple_pay_topup',
}

enum transactionOperations {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

enum transactionHideItems {
  NAME = 'name',
  AMOUNT = 'amount',
}

enum localizationKeys {
  TRANSACTION_TYPE = 'transaction_type',
}

enum copiableKeys {
  REF_NUMBER = 'ref_number',
}

export { transactionTypes, transactionHideItems, localizationKeys, copiableKeys, transactionOperations };
