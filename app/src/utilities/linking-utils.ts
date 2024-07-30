import { Linking } from 'react-native';

const openURL = (url: string) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

const openGoogleMaps = (latitude: number, longitude: number) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  openURL(url);
};

export { openGoogleMaps, openURL };
