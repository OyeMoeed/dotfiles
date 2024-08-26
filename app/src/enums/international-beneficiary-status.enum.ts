/**
 * Defines international beneficiary status.
 */
enum InternationalBeneficiaryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

/**
 * Defines Transfer Gateway Type
 */
enum TransferGatewayType {
  ALINMA_DIRECT = 'Alinma Direct',
  WESTERN_UNION = 'Western Union',
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
  beneficiaryNickName = 'BENEFICIARY_NICK_NAME',
  beneficiaryFullName = 'BENEFICIARY_FULL_NAME',
  relationship = 'RELATION_SHIP',
  countryName = 'COUNTRY_NAME',
  cityName = 'CITY_NAME',
  deliveryType = 'DELIVERY_TYPE',
  currency = 'CURRENCY',
}

enum LabelKey {
  AMOUNT_TO = 'amountTo',
  AMOUNT_FROM = 'amountFrom',
  VAT = 'vat',
}

export { InternationalBeneficiaryStatus, LabelKey, LocalizationKeysMapping, TransferGatewayType };
