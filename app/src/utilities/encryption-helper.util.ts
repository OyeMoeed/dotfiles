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
