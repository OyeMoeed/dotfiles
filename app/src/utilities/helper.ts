import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * This fucntion is used to get comma seprated number.
 * It expexts a param which can be either number of string and it returns that value in string form.
 * @param {number | string} number
 * @returns {string}
 */
const commaSeparatedNumber = (number: number | string): string => {
  if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '0';
};

/**
 * Fucntion set value to AsyncStorage.
 * It requires to parameters a key and a value to set the data in AsyncStorage.
 * If the value is set succesfully it will return true. If it catches any error it will return false.
 * @param {string} key
 * @param {string} value
 * @returns {PromiseLike<boolean>}
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
 * Fucntion get value from AsyncStorage.
 * It expects a key and based on that key it will return a value if there is no any value added it will return null.
 * @param {string} key
 * @returns {PromiseLike<string | null>}
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

export default {
  commaSeparatedNumber,
  setValueToAsyncStorage,
  getValueFromAsyncStorage
};
