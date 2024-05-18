/**
 * Represents the properties of API headers.
 */
export interface ApiHeaderProps {
  /**
   * The URL of the API endpoint.
   */
  url: string;
  /**
   * The HTTP method used for the request.
   */
  method: string;
  /**
   * The body of the request, which can be an object, a string, or null.
   */
  body?: object | string | null;
}

/**
 * Represents the properties of an encryption variable.
 */
export interface EncryptionVariableProps {
  /**
   * The variable to be encrypted, which can be a string or an object.
   */
  variable: string | object;
  /**
   * The encryption key to use for encrypting the variable.
   */
  encryptionKey?: string;
}

/**
 * Represents the possible theme types.
 */
export type ThemeType = 'lightTheme' | 'darkTheme' | 'nationalDay';

/**
 * Represents the type of localization settings.
 */
export type localizationType = {
  /**
   * The selected language for localization.
   */
  language: string;
};
