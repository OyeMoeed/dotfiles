import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';

const options =
  Platform.OS === 'ios'
    ? {}
    : { accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD, rules: Keychain.SECURITY_RULES.NONE };
//
// Store sensitive data securely
export const storeData = async (serviceName: string, key: string, value: string) => {
  try {
    // Store data securely with Keychain
    await Keychain.setGenericPassword(key, value, {
      service: serviceName,
      ...options,
    });
    return null;
  } catch (error) {
    return null;
  }
};

// Retrieve sensitive data securely
export const retrieveData = async (serviceName: string, key: string): Promise<string | null> => {
  try {
    // Retrieve data from Keychain
    const credentials = await Keychain.getGenericPassword({
      service: serviceName,
      accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE,
      ...options,
    });

    if (credentials && credentials.username === key) {
      return credentials.password;
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Delete sensitive data securely
export const deleteData = async (serviceName: string) => {
  try {
    // Delete data from Keychain
    await Keychain.resetGenericPassword({
      service: serviceName,
      ...options,
    });
    return null;
  } catch (error) {
    return null;
  }
};

// Check if sensitive data is stored
export const isDataStored = async (serviceName: string, key: string): Promise<boolean> => {
  try {
    // Check if data exists in Keychain
    const credentials = await Keychain.getGenericPassword({
      service: serviceName,
      ...options,
    });

    return credentials && !!credentials.password && credentials.username === key;
  } catch (error) {
    return false;
  }
};
