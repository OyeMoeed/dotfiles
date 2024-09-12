enum GiftStatus {
  INITIATED = 'initiated',
  EXECUTED = 'executed',
  FAILED = 'failed',
}

enum GiftLocalizationKeys {
  status = 'STATUS',
  receiverName = 'RECEIVER_NAME',
  receiverMobile = 'RECEIVER_MOBILE',
  amount = 'AMOUNT',
  trnsDateTime = 'TRANSACTION_DATE_TIME',
}

enum GiftTransactionKey {
  STATUS = 'status',
  RECEIVER_NAME = 'receiverName',
  RECEIVER_MOBILE = 'receiverMobile',
  AMOUNT = 'amount',
  TRANSACTION_DATE_TIME = 'trnsDateTime',
}

export { GiftLocalizationKeys, GiftStatus, GiftTransactionKey };
