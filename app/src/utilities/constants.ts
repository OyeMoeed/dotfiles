import { Dimensions, I18nManager, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('screen');
const isAndroidOS = Platform.OS === 'android';

const isArabic = I18nManager.isRTL;
const isIosOS = Platform.OS === 'ios';
const isTablet = DeviceInfo.isTablet();
// Function to check if the device is an iPad
const isIpad = () => Platform.OS === 'ios' && (Platform.isPad || height / width < 1.8);

export { isAndroidOS, isIosOS, isIpad, isTablet, isArabic };
