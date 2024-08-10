import { Linking } from 'react-native';

const onCall = (value: string) => {
  Linking.openURL(`tel: ${value}`);
};

export { onCall };
