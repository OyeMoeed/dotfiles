/**
 * Object containing various color values organized by categories.
 * @module colors
 */

/**
 * Object containing primary color values.
 * @typedef {Object} primary
 *  @property {string} primary10 - Primary color variant 10.
 * @property {string} primary50 - Primary color variant 50.
 * @property {string} primary100 - Primary color variant 100.
 * @property {string} primary200 - Primary color variant 200.
 * @property {string} primary300 - Primary color variant 300.
 * @property {string} primary400 - Primary color variant 400.
 * @property {string} primary500 - Primary color variant 500.
 * @property {string} primary600 - Primary color variant 600.
 * @property {string} primary700 - Primary color variant 700.
 * @property {string} primary800 - Primary color variant 800.
 * @property {string} primary900 - Primary color variant 900.
 * @property {string} primary950 - Primary color variant 900.
 */

/**
 * Object containing secondary color values.
 * @typedef {Object} secondary
 * @property {string} secondary50 - Secondary color variant 50.
 * @property {string} secondary100 - Secondary color variant 100.
 * @property {string} secondary200 - Secondary color variant 200.
 * @property {string} secondary300 - Secondary color variant 300.
 * @property {string} secondary400 - Secondary color variant 400.
 * @property {string} secondary500 - Secondary color variant 500.
 * @property {string} secondary600 - Secondary color variant 600.
 * @property {string} secondary700 - Secondary color variant 700.
 * @property {string} secondary800 - Secondary color variant 800.
 * @property {string} secondary900 - Secondary color variant 900.
 */

/**
 * Object containing tertiary color values.
 * @typedef {Object} tertiary
 * @property {string} tertiary50 - Tertiary color variant 50.
 * @property {string} tertiary100 - Tertiary color variant 100.
 * @property {string} tertiary200 - Tertiary color variant 200.
 * @property {string} tertiary300 - Tertiary color variant 300.
 * @property {string} tertiary400 - Tertiary color variant 400.
 * @property {string} tertiary500 - Tertiary color variant 500.
 * @property {string} tertiary600 - Tertiary color variant 600.
 * @property {string} tertiary700 - Tertiary color variant 700.
 * @property {string} tertiary800 - Tertiary color variant 800.
 * @property {string} tertiary900 - Tertiary color variant 900.
 */

/**
 * Object containing natural color values.
 * @typedef {Object} natural
 * @property {string} natural0 - Natural color variant 0.
 * @property {string} natural5 - Natural color variant 5.
 * @property {string} natural10 - Natural color variant 10.
 * @property {string} natural50 - Natural color variant 50.
 * @property {string} natural100 - Natural color variant 100.
 * @property {string} natural150 - Natural color variant 100.
 * @property {string} natural200 - Natural color variant 200.
 * @property {string} natural300 - Natural color variant 300.
 * @property {string} natural500 - Natural color variant 500.
 * @property {string} natural700 - Natural color variant 700.
 * @property {string} natural900 - Natural color variant 900.
 * @property {string} natural1000 - Natural color variant 1000.
 */

/**
 * Object containing error color values.
 * @typedef {Object} error
 * @property {string} error25 - error color variant 25.
 * @property {string} error500 - error color variant 500.
 * @property {string} error800 - error color variant 800.
 */

/**
 * Object containing warning color values.
 * @typedef {Object} warning
 * @property {string} warning25 - warning color variant 25.
 * @property {string} warning500 - warning color variant 500.
 * @property {string} warning800 - warning color variant 800.
 */

/**
 * Object containing critical color values.
 * @typedef {Object} critical
 * @property {string} critical25 - critical color variant 25.
 * @property {string} critical500 - critical color variant 500.
 * @property {string} critical800 - critical color variant 800.
 */

/**
 * Object containing success color values.
 * @typedef {Object} success
 * @property {string} success25 - success color variant 25.
 * @property {string} success500 - success color variant 500.
 * @property {string} success800 - success color variant 800.
 */

/**
 * Object containing various color values.
 * @type {Object}
 * @property {PrimaryColors} primary - Primary color values.
 * @property {SecondaryColors} secondary - Secondary color values.
 * @property {TertiaryColors} tertiary - Tertiary color values.
 * @property {NaturalColors} natural - Natural color values.
 * @property {Array<string>} gradientPrimary - Gradient color array 1.
 * @property {Array<string>} gradientSecondry - Gradient color array 2.
 */

const colors = {
  primary: {
    primary10: '#F6F9FC',
    primary50: '#EFFAFF',
    primary80: '#00BAFE33',
    primary100: '#DEF3FF',
    primary200: '#B6EAFF',
    primary300: '#75DCFF',
    primary400: '#2CCBFF',
    primary450: '#26C3C6',
    primary500: '#00BAFE',
    primary600: '#0091D4',
    primary650: '#A1CBFE',
    primary700: '#0073AB',
    primary800: '#00618D',
    primary900: '#04334D',
    primary950: '#041D36',
  },

  secondary: {
    secondary50: '#F9F5FF',
    secondary100: '#F1E8FF',
    secondary200: '#E5D4FF',
    secondary300: '#CAA7FF',
    secondary400: '#B582FE',
    secondary500: '#9953F9',
    secondary600: '#8231EC',
    secondary700: '#6E20D0',
    secondary800: '#4E1B88',
    secondary900: '#330665',
  },

  tertiary: {
    tertiary50: '#F2FCE9',
    tertiary100: '#E1F8CF',
    tertiary200: '#C5F2A4',
    tertiary300: '#A6E979',
    tertiary400: '#7DD942',
    tertiary500: '#5DBE24',
    tertiary600: '#459818',
    tertiary700: '#367417',
    tertiary800: '#2A4E19',
    tertiary900: '#122B08',
  },

  natural: {
    natural0: '#FFFFFF',
    natural4: '#ffffff40',
    natural5: '#FFFFFF99',
    natural10: '#FFFFFF80',
    natural50: '#f6f9fc80',
    natural100: '#F8F8F8',
    natural150: '#F0F1F3',
    natural200: '#E9E9E9',
    natural300: '#BDBDBD',
    natural500: '#7C7C7C',
    natural700: '#3D3D3D',
    natural900: '#292929',
    natural1000: '#000000',
  },

  error: {
    error25: '#FFEBEE',
    error500: '#F44336',
    error800: '#73110A',
  },

  warning: {
    warning25: '#FFF3E0',
    warning500: '#FF9800',
    warning600: '#FF7A43',
    warning800: '#734500',
    warningOpacity: 'rgba(255, 207, 134, 0.1)',
  },

  critical: {
    critical25: '#FFFDE7',
    critical500: '#FFEB3B',
    critical800: '#735F00',
  },

  success: {
    success25: '#F2FCE9',
    success500: '#5DBE24',
    success800: '#2A4E19',
  },
  backgrounds: {
    backdrop: '#04334D99', // primary900 + 60% opacity
    greyOverlay: '#F6F9FC',
    successBackground: '#F6F9FC80',
    errorOverlay: '#fae4e599',
    frozenOverlay: '#FFFFFF99',
    transparent: 'transparent',
  },

  appGradient: {
    gradientSecondary10: ['#75DCFF', '#52D2FF', '#00BAFE'],
    gradientSecondary20: ['#A6E979', '#52D1BC', '#32C8D6'],
    gradientSecondary30: ['#CAA7FF', '#76AFFF', '#54B2FE'],
    gradientSecondary40: ['#DEF3FF', '#F1E8FF'],
    gradientSecondary50: ['#00BAFE', '#CAA7FF', '#00BAFE', '#CAA7FF'], // [primary500, secondary300]
    gradientPrimary10: ['rgba(0, 186, 254, 0.2)', 'rgba(202, 167, 255, 0.2)'],
    gradientPrimary20: ['#caa7ff4d', '#00bafe4d'],
    gradientPrimary30: ['#00bafe33', '#7dd94233'],
    gradientPrimary40: ['#CAA7FF14', '#00BAFE14'],
    progressBarGradient: ['#7DD942', '#00BAFE'],
    buttonBackground: ['#00BAFE1F', '#CAA7FF1F'],
  },

  gradientPrimary: ['#00BAFE', '#CAA7FF'], // [primary500, secondary300]
  gradientSecondary: ['#00BAFE', '#A6E979'], // [primary500, tertiary300]
  bottomsheetGradient: ['#00bafe1a', '#caa7ff1a'],
  primaryWithOpacity: 'rgba(0, 186, 254, 0.12)',
  classicCardGradient: ['#caa7ff33', '#00bafe33'],
  platinumCardGradient: ['#2CCBFF33', '#04334D33'],
  signatureCardGradient: ['#374a81', '#3d4f82'],
  gradientPrimaryReverse: ['#CAA7FF', '#00BAFE'],
  transparent: 'transparent',
};

export default colors;
