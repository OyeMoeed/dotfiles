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
  OUTLINED = 'outlined',
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

enum inputVariants {
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

export {
  BarStyle,
  CAROUSEL_MODES,
  TabBase,
  alertType,
  alertVariant,
  buttonVariants,
  dayPeriod,
  fallbackVariants,
  inputVariants,
  pickerVariant,
  spinnerVariant,
  variants,
};
