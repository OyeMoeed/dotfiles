import { Linking } from 'react-native';

const openURL = (url: string) => {
  if (url.startsWith('intent://')) {
    // Parse the intent URL to extract the fallback URL
    const fallbackUrlMatch = url.match(/S\.browser_fallback_url=(.*?)(;|$)/);
    const fallbackUrl = fallbackUrlMatch ? decodeURIComponent(fallbackUrlMatch[1]) : null;

    if (fallbackUrl) {
      Linking.openURL(fallbackUrl);
    }
  } else {
    // Handle normal URLs
    Linking.openURL(url);
  }
};

const openGoogleMaps = (latitude: number, longitude: number) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  openURL(url);
};

const openAppOrStore = async (appUrl: string, storeUrl?: string): Promise<void> => {
  const supported = await Linking.canOpenURL(appUrl);
  if (supported) {
    await Linking.openURL(appUrl);
  } else {
    await Linking.openURL(storeUrl || '');
  }
};

export { openGoogleMaps, openURL, openAppOrStore };
