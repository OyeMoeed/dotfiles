enum GiftStatus {
  UNOPENED = 'unopened',
  OPENED = 'opened',
  EXPIRED = 'expired',
  NEW = 'new',
}

enum LocalizationKeys {
  status = 'STATUS',
  receiverName = 'RECEIVER_NAME',
  receiverMobile = 'RECEIVER_MOBILE',
  amount = 'AMOUNT',
  trnsDateTime = 'TRANSACTION_DATE_TIME',
}

export { GiftStatus, LocalizationKeys };
