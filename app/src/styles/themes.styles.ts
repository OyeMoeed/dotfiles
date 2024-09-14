/**
 * Defines themes for the application.
 */
const enum Themes {
  LIGHT_THEME = 'lightTheme',
  DARK_THEME = 'darkTheme',
  NATIONAL_DAY = 'nationalDay',
}

/**
 * Represents the possible theme types.
 */
export type ThemeType = Themes.LIGHT_THEME | Themes.DARK_THEME | Themes.NATIONAL_DAY;
