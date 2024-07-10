/**
 * Defines variants types used in application.
 */
enum variants {
  WARNING = 'warning',
  NEUTRAL = 'neutral',
  SUCCESS = 'success',
  SEVERE = 'severe',
  NATURAL = 'natural',
  COLORED = 'colored',
  NORMAL = 'normal',
  SECONDARY = 'secondary',
  PRIMARY = 'primary',
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
 */
enum buttonVariants {
  OUTLINED = 'outline',
  FILLED = 'filled',
  PRIMARY = 'primary',
}

enum alertVariant {
  DEFAULT = 'default',
  DESTRUCTIVE = 'destructive',
}

enum alertType {
  DEFAULT = 'default',
  SIDE_BY_SIDE = 'sideByside',
}

enum spinnerVariant {
  TEXT = 'text',
  DEFAULT = 'default',
}

/**
 * Defines variants types used for timePeriod.
 */
enum dayPeriod {
  AM = 'AM',
  PM = 'PM',
}

/**
 * Defines variants types used for picker button.
 */
enum pickerVariant {
  Date = 'date',
  Text = 'text',
  Time = 'time',
  DateAndTime = 'dateAndTime',
}

enum inputType {
  CURRENCY = 'Currency',
  PHONE_NUMBER = 'PhoneNumber',
}

enum CAROUSEL_MODES {
  DEFAULT = 'default',
  STACK = 'stack',
  PARALLAX = 'parallax',
}

enum fallbackVariants {
  IMAGE = 'image',
  LOADER = 'loader',
  LOGO = 'logo',
}

enum payChannel {
  APPLE = 'apple',
  CARD = 'card',
  ATM = 'atm',
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
  FILTERS = 'filter',
  TRANSACTION_TYPE = 'transaction_type',
  CARD = 'card',
}

enum topupStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

enum toastTypes {
  WARNING = 'warning',
  SUCCESS = 'success',
  INFORMATION = 'information',
}

enum CardCategories {
  CLASSIC = 'classic',
  PLATINUM = 'platinum',
  SIGNATURE = 'signature',
}

enum CardTypes {
  CLASSIC = 'classic',
  PLATINUM = 'platinum',
  SIGNATURE = 'signature',
}

enum CardOptions {
  PHYSICAL = 'Physical',
  VIRTUAL = 'Virtual',
}

enum CardDetailsSegment {
  CARD_FEATURE = 'Card Features',
  CARD_FEES = 'Card Fees',
}

enum dashboardOptions {
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
}


// Export all enums
export {
  BarStyle,
  CAROUSEL_MODES,
  CardCategories, CardDetailsSegment, CardTypes,
  FiltersType,
  IdRenewalState,
  LanguageCode,
  TabBase,
  alertType,
  alertVariant,
  buttonVariants,
  dashboardOptions,
  dayPeriod,
  fallbackVariants,
  inputType,
  payChannel,
  pickerVariant,
  spinnerVariant,
  toastTypes,
  topupStatus,
  variants,
  CardOptions
};

