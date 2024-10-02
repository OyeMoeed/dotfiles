import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description used to unify key name accross the app avoiding keys typo issues
 */
enum StorageKeys {
  ENV = 'currentAppEnv',
}
/**
 * Function to set value to AsyncStorage.
 * It requires two parameters: a key and a value to set the data in AsyncStorage.
 * If the value is set successfully, it will return true. If it catches any error, it will return false.
 * @param {string} key
 * @param {string} value
 * @returns {Promise<boolean>}
 */
const setValueToAsyncStorage = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Function to get value from AsyncStorage.
 * It expects a key and based on that key it will return a value. If there is no value added, it will return null.
 * @param {string} key
 * @returns {Promise<string | null>}
 */
const getValueFromAsyncStorage = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    return null;
  }
};

/**
 * Function to remove values from AsyncStorage.
 */
const removeValueFromAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return null;
  } catch (e) {
    return null;
  }
};

/**
 * Function to clear values from AsyncStorage.
 */
const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    return null;
  } catch (e) {
    return null;
  }
};

export {
  StorageKeys,
  clearAsyncStorage,
  getValueFromAsyncStorage,
  removeValueFromAsyncStorage,
  setValueToAsyncStorage,
};
