/**
 * Defines international beneficiary status.
 */
enum InternationalBeneficiaryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  NEW_BENEFICIARY = 'newBeneficiary',
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
  totalAmount = 'TOTAL_AMOUNT',
  nickname = 'BENEFICIARY_NICK_NAME',
  fullName = 'BENEFICIARY_FULL_NAME',
  relationship = 'RELATION_SHIP',
  countryDesc = 'COUNTRY_NAME',
  city = 'CITY_NAME',
  remittanceTypeDesc = 'DELIVERY_TYPE',
  currency = 'CURRENCY',
  beneficiaryCurrencyAmount = 'AMOUNT_BEN',
  remitterCurrencyAmount = 'AMOUNT_SAR',
  vatAmount = 'VAT',
  feeAmount = 'FEES',
  isIncludeFees = 'INCLUDE_FEES',
}

enum LabelKey {
  AMOUNT_TO = 'amountTo',
  AMOUNT_FROM = 'amountFrom',
  VAT = 'vat',
}

enum BeneficiariesDetails {
  INFORMATIONS = 'INFORMATIONS',
  DETAILS = 'DETAILS',
  FEES = 'FEES',
}

enum BeneficiaryDetailKeys {
  TRANSACTION_ID = 'transactionId',
  COUNTRY = 'country',
  TOTAL_AMOUNT = 'totalAmount',
}

export {
  BeneficiariesDetails,
  BeneficiaryDetailKeys,
  InternationalBeneficiaryStatus,
  LabelKey,
  LocalizationKeysMapping,
  TransferGatewayType,
};
