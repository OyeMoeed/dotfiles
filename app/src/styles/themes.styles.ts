/**
 * Defines themes for the application.
 */
const enum themes {
  LIGHT_THEME = 'lightTheme',
  DARK_THEME = 'darkTheme',
  NATIONAL_DAY = 'nationalDay'
}

/**
 * Represents the possible theme types.
 */
export type ThemeType = themes.LIGHT_THEME | themes.DARK_THEME | themes.NATIONAL_DAY;
