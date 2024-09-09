export enum MoneyRequestStatus {
  CANCEL = 'cancelled',
  PAID = 'executed',
  PENDING = 'initiated',
  REJECTED = 'rejected',
}

export enum KeysToProcess {
  SEND_DATE = 'send_date',
  CANCELLATION_DATE = 'cancellation_date',
  PAYMENT_DATE = 'payment_date',
  REJECTION_DATE = 'rejection_date',
}

export enum LocalizationKeys {
  STATUS = 'status',
}

export enum CopiableKeys {
  REF_NUMBER = 'ref_number',
}

export enum LocalizationKeysMapping {
  status = 'STATUS',
  receiver_mobile_number = 'RECEIVER_MOBILE_NUMBER',
  sender_mobile_number = 'SENDER_MOBILE_NUMBER',
  send_date = 'SEND_DATE',
  cancellation_date = 'CANCELLATION_DATE',
  payment_date = 'PAYMENT_DATE',
  rejection_date = 'REJECTION_DATE',
  request_date = 'REQUEST_DATE',
  sender = 'SENDER',
  transfer_reason = 'TRANSFER_REASON',
  note = 'NOTE',
  ref_number = 'REF_NUMBER',
}
