/**
 * Defines States types used in application.
 */
enum States {
  WARNING = 'warning',
  NEUTRAL = 'neutral',
  SUCCESS = 'success',
  SEVERE = 'severe',
  NATURAL = 'natural',
  COLORED = 'colored',
  NORMAL = 'normal',
  SECONDARY = 'secondary',
  PRIMARY = 'primary',
  ERROR = 'error',
}
enum PaymentType {
  MOI = 'moi',
  REFUND = 'moi-refund',
}

enum TabBase {
  Natural = 'Natural',
  Colored = 'Colored',
}

enum BarStyle {
  LIGHT_CONTENT = 'light-content',
  DARK_CONTENT = 'dark-content',
}

/**
 * Defines button variants types used in application.
 * note if remove disable you need to fix/change more than 200 files
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
enum buttonVariants {
  OUTLINED = 'outline',
  LINK_BUTTON = 'link-button',
  PRIMARY = 'primary',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
enum alertVariant {
  DEFAULT = 'default',
  DESTRUCTIVE = 'destructive',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
enum alertType {
  DEFAULT = 'default',
  SIDE_BY_SIDE = 'sideByside',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
enum SpinnerVariant {
  TEXT = 'text',
  DEFAULT = 'default',
}

/**
 * Defines variants types used for timePeriod.
 */
enum DayPeriod {
  AM = 'AM',
  PM = 'PM',
}

/**
 * Defines variants types used for picker button.
 */
enum PickerVariant {
  Date = 'date',
  Text = 'text',
  Time = 'time',
  DateAndTime = 'dateAndTime',
}

enum InputType {
  CURRENCY = 'Currency',
  PHONE_NUMBER = 'PhoneNumber',
}

enum CarouselModes {
  DEFAULT = 'default',
  STACK = 'stack',
  PARALLAX = 'parallax',
}

enum FallbackVariants {
  IMAGE = 'image',
  LOADER = 'loader',
  LOGO = 'logo',
}

enum PayChannel {
  REQUEST_ACCEPT = 'request_accept',
  MONEY = 'money',
  REQUEST = 'request',
  APPLE = 'apple',
  CARD = 'card',
  WALLET = 'wallet',
  ATM = 'atm',
  GIFT = 'gift',
  ORDER = 'order',
}

// Define an enum for the language codes
enum LanguageCode {
  AR = 'ar',
  EN = 'en',
  UR = 'ur',
  HI = 'hi',
  TL = 'tl',
  NE = 'ne',
  BN = 'bn',
}
// Define the possible states for ID renewal
enum IdRenewalState {
  EXPIRE_FLAG_REACHED = 'expire_flag_reached',
  EXPIRE_FLAG_NOT_REACHED = 'expire_flag_not_reached',
  ABOUT_TO_EXPIRE = 'about_to_expire',
}

enum FiltersType {
  TRANSACTION_TYPE = 'transactionType',
  CARD = 'card',
  AMOUNT_FROM = 'amountFrom',
  AMOUNT_TO = 'amountTo',
  DATE_TO = 'dateTo',
  DATE_FROM = 'dateFrom',
  BENEFICIARY_NAME = 'beneficiaryName',
  BENEFICIARY_NAME_LIST = 'beneficiaryNameList',
  BANK_NAME_LIST = 'beneficiaryBankName',
  CONTACT_NUMBER = 'contactNumber',
  STATUS = 'status',
  OCCASION = 'occasion',
  OFFER_CATEGORY = 'offerCategory',
  OFFER_AVAILABILITY = 'offerAvailability',
  DELIVERY_TYPE = 'deliveryType',
  SALARY_TYPE = 'salaryType',
  LABORER_NAME = 'laborerName',
}

enum TopupStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

enum ToastTypes {
  WARNING = 'warning',
  SUCCESS = 'success',
  INFORMATION = 'information',
}

enum CardCategories {
  CLASSIC = 'IPMC',
  PLATINUM = 'VPPC',
  SIGNATURE = 'VSCC',
}

enum CardTypes {
  DEBIT_CARD = 'Classic Debit Card',
  PLATINUIM_CARD = 'Platinum Cashback Prepaid',
  SIGNATURE_CARD = 'Signature Prepaid Card',
  CLASSIC = 'IPMC',
  PLATINUM = 'VPPC',
  SIGNATURE = 'VSCC',
}
enum CardStatusNumber {
  ActiveWithoutOnlinePurchase = '0',
  ActiveWithOnlinePurchase = '100',
  Stolen = '700',
  Freezed = '850',
  Expired = '400',
}

enum CardTypesCodes {
  MADA = 'IPMC',
  PLATINUM = 'VPPC',
  SIGNATURE = 'VSCC',
}

const CardMapping = {
  classic: 'IPMC',
  platinum: 'VPPC',
  signature: 'VSCC',
};

enum CardOptions {
  PHYSICAL = 'Physical',
  VIRTUAL = 'Virtual',
}
enum CardActiveStatus {
  FREEZE = 'freeze',
  UNFREEZE = 'unfreeze',
}
enum CardStatusIndication {
  EXPIRY = 'expiry',
  ANNUAL = 'annual',
  ANNUAL_EXPIRED = 'annual_expired',
}
enum CardStatusType {
  WARNING = 'warning',
  ALERT = 'alert',
}

enum CardDetailsSegment {
  CARD_FEATURE = 'Card Features',
  CARD_FEES = 'Card Fees',
}

enum DashboardOptions {
  SEND_MONEY = 'Send Money',
  REQUEST_MONEY = 'Request Money',
  SEND_GIFT = 'Send Gift',
  BILL_PAYMENTS = 'Bill Payments',
  INTERNATIONAL_TR = 'International Tr.',
  ATM_WITHDRAWALS = 'ATM Withdrawals',
  LOCAL_TRANSFER = 'Local transfer',
  QR_ACCEPTANCE = 'QR acceptance',
  SPENDING_LIMIT = 'Spending limit',
  MY_ACCOUNT = 'My account',
  MUSANED = 'Musaned',
  EHSAN = 'ehsan',
}

enum TopUpStates {
  INITAL_STATE = 'INITAL_STATE',
  SAVED_CARD = 'SAVED_CARD',
  NEW_CARD = 'NEW_CARD',
}
enum InfoTypes {
  CVV = 'CVV',
  EXPIRY = 'EXPIRY',
}

enum AddBeneficiary {
  BANK_NAME = 'bankName',
  IBAN = 'iban',
  BENEFICIARY_NAME = 'beneficiaryName',
  BENEFICIARY_NICK_NAME = 'beneficiaryNickName',
}

enum AddBeneficiaryKey {
  BANK_NAME = 'Bank Name',
  IBAN = 'Iban',
}
enum BeneficiaryTypes {
  ACTIVE = 'ACTIVATE',
  INACTIVE = 'NEW_BENEFICIARY',
}

enum APIResponseType {
  SUCCESS = 'SUCCESS',
}

enum BiometricErrorTypes {
  NO_IDENTITIES_ENROLLED = 'No identities are enrolled',
  USER_DENIED_BIOMETRY = 'User has denied the use of biometry for this app',
  BIOMETRIC_ERROR_NONE_ENROLLED = 'BIOMETRIC_ERROR_NONE_ENROLLED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

enum BillsStatusTypes {
  ACTIVE_BILLS = 'Active Bills',
  INACTIVE_BILLS = 'Inactive Bills',
}

enum BillStatus {
  UNPAID = 'BillUnpaid',
  PAID = 'BillPaid',
  PARTIALLY_PAID = 'BillPartialPd',
  OVER_PAID = 'BillOverPd',
  DEACTIVE = 'BillDeactive',
}
interface FilterValue {
  id: string;
  key: string;
  value: string;
  image?: string;
}

interface TransactionHistoryFilter {
  description?: string;
  image?: string;
}

interface Filter {
  id: string;
  label: string;
  type: FiltersType; // Assuming FiltersType is a defined type or enum
  filterValues: FilterValue[];
  icon?: string;
}
enum GiftCardStatus {
  OPENED = 'opened',
  UNOPENED = 'unopened',
  EXPIRED = 'expired',
}

enum GiftCardDetailsKey {
  AMOUNT = 'amount',
  REF_NUMBER = 'refNumber',
  STATUS = 'status',
  RECIEVER_NAME = 'receiverName',
  RECIEVER_MOBILE = 'receiverMobile',
}

enum ApiResponseStatusType {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  ERROR = 'ERROR',
}

enum MoiPaymentTypes {
  PAYMENT = 'Payment',
  REFUND = 'Refund',
}
enum TrafficTabPaymentTypes {
  INQUIRE = 'Inquire',
  REFUND = 'Refund',
}
enum TrafficVoilationTypes {
  BY_VIOLATION_NUM = 'By Violation Num',
  BY_VIOLATION_ID = 'By Violator ID',
}

enum BillPaymentOptions {
  MOI_PAYEMNT = 'Government Payments (MOI)',
  TRAFFIC_VIOLATION = 'Traffic Violation',
}

enum BillingStatus {
  ENABLED = 'ENABLED',
  NOT_ENABLED = 'NOT_ENABLED',
}

enum MusanedStatus {
  UNPAIED = 'Unpaid',
  PAID = 'Paid',
}

enum TrafficViolationFields {
  VIOLATION_NUMBER = 'Violation Number',
  VIOLATOR_ID = 'Violator ID',
  ID_TYPE = 'ID Type',
}

// Export all enums
export {
  APIResponseType,
  AddBeneficiary,
  AddBeneficiaryKey,
  ApiResponseStatusType,
  BarStyle,
  BeneficiaryTypes,
  BillPaymentOptions,
  BillStatus,
  BillingStatus,
  BillsStatusTypes,
  BiometricErrorTypes,
  CardActiveStatus,
  CardCategories,
  CardDetailsSegment,
  CardMapping,
  CardOptions,
  CardStatusIndication,
  CardStatusNumber,
  CardStatusType,
  CardTypes,
  CardTypesCodes,
  CarouselModes,
  DashboardOptions,
  DayPeriod,
  FallbackVariants,
  Filter,
  FilterValue,
  FiltersType,
  GiftCardDetailsKey,
  GiftCardStatus,
  IdRenewalState,
  InfoTypes,
  InputType,
  LanguageCode,
  MoiPaymentTypes,
  PayChannel,
  PaymentType,
  PickerVariant,
  SpinnerVariant,
  States,
  TabBase,
  ToastTypes,
  TopUpStates,
  TopupStatus,
  TrafficTabPaymentTypes,
  TrafficViolationFields,
  TrafficVoilationTypes,
  TransactionHistoryFilter,
  alertType,
  alertVariant,
  buttonVariants,
  MusanedStatus,
};
