import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');
const isAndroidOS = Platform.OS === 'android';

const isIosOS = Platform.OS === 'ios';

// Function to check if the device is an iPad
const isIpad = () => Platform.OS === 'ios' && (Platform.isPad || height / width < 1.6);

export { isAndroidOS, isIosOS, isIpad };
