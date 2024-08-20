/**
 * Defines international beneficiary status.
 */
enum InternationalBeneficiaryStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

enum LocalizationKeysMapping {
  beneficiary = 'BENEFICIARY',
  country = 'COUNTRY',
  transactionId = 'TRANSACTION_ID',
  bankTransfer = 'BANK_TRANSFER',
  iban = 'IBAN',
  bankName = 'BANK_NAME',
  phoneNumber = 'PHONE_NUMBER',
  reasonOfTransfer = 'REASON_OF_TRANSFER',
  amountTo = 'AMOUNT_TO',
  amountFrom = 'AMOUNT_FROM',
  exchangeRate = 'EXCHANGE_RATE',
  vat = 'VAT',
  fees = 'FEES',
  totalAmount = 'TOTAL_AMOUNT',
}

enum LabelKey {
  AMOUNT_TO = 'amountTo',
  AMOUNT_FROM = 'amountFrom',
  VAT = 'vat',
}

export { InternationalBeneficiaryStatus, LabelKey, LocalizationKeysMapping };
