/**
 * Object containing various color values organized by categories.
 * @module colors
 */

/**
 * Object containing primary color values.
 * @typedef {Object} PrimaryColors
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
 */

/**
 * Object containing secondary color values.
 * @typedef {Object} SecondaryColors
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
 * @typedef {Object} TertiaryColors
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
 * @typedef {Object} NaturalColors
 * @property {string} natural0 - Natural color variant 0.
 * @property {string} natural100 - Natural color variant 100.
 * @property {string} natural200 - Natural color variant 200.
 * @property {string} natural300 - Natural color variant 300.
 * @property {string} natural500 - Natural color variant 500.
 * @property {string} natural700 - Natural color variant 700.
 * @property {string} natural900 - Natural color variant 900.
 * @property {string} natural1000 - Natural color variant 1000.
 */

/**
 * Object containing various color values.
 * @type {Object}
 * @property {PrimaryColors} primary - Primary color values.
 * @property {SecondaryColors} secondary - Secondary color values.
 * @property {TertiaryColors} tertiary - Tertiary color values.
 * @property {NaturalColors} natural - Natural color values.
 * @property {string} red25 - Red color variant 25.
 * @property {string} red500 - Red color variant 500.
 * @property {string} red800 - Red color variant 800.
 * @property {string} orange25 - Orange color variant 25.
 * @property {string} orange500 - Orange color variant 500.
 * @property {string} orange800 - Orange color variant 800.
 * @property {string} yellow25 - Yellow color variant 25.
 * @property {string} yellow500 - Yellow color variant 500.
 * @property {string} yellow800 - Yellow color variant 800.
 * @property {string} green25 - Green color variant 25.
 * @property {string} green500 - Green color variant 500.
 * @property {string} green800 - Green color variant 800.
 * @property {Array<string>} gradient1 - Gradient color array 1.
 * @property {Array<string>} gradient2 - Gradient color array 2.
 * @property {string} white - White color.
 * @property {string} black - Black color.
 * @property {string} green - Green color.
 * @property {string} vibrantBlue - Vibrant blue color.
 * @property {string} lightGrey - Light grey color.
 * @property {string} gray94 - Gray variant 94.
 * @property {string} grey - Grey color.
 * @property {string} creamWhite - Cream white color.
 */

const colors = {
  primary: {
    primary50: '#EFFAFF',
    primary100: '#DEF3FF',
    primary200: '#B6EAFF',
    primary300: '#75DCFF',
    primary400: '#2CCBFF',
    primary500: '#00BAFE',
    primary600: '#0091D4',
    primary700: '#0073AB',
    primary800: '#00618D',
    primary900: '#04334D'
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
    secondary900: '#330665'
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
    tertiary900: '#122B08'
  },

  natural: {
    natural0: '#FFFFFF',
    natural100: '#F8F8F8',
    natural200: '#E9E9E9',
    natural300: '#BDBDBD',
    natural500: '#7C7C7C',
    natural700: '#3D3D3D',
    natural900: '#292929',
    natural1000: '#000000'
  },

  red25: '#FFEBEE',
  red500: '#F44336',
  red800: '#73110A',

  orange25: '#FFF3E0',
  orange500: '#FF9800',
  orange800: '#734500',

  yellow25: '#FFFDE7',
  yellow500: '#FFEB3B',
  yellow800: '#735F00',

  green25: '#F2FCE9',
  green500: '#5DBE24',
  green800: '#2A4E19',

  gradient1: ['#00BAFE', '#CAA7FF'],
  gradient2: ['#00BAFE', '#A6E979'],

  white: '#fff',
  black: '#000',
  green: 'green',
  vibrantBlue: '#2277ee',
  lightGrey: '#EEE',
  gray94: '#f0f0f0',
  grey: '808080',
  creamWhite: '#f9f9f9'
};

export default colors;
