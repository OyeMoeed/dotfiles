import Clipboard from '@react-native-clipboard/clipboard';

export const copyText = (textToCopy: string) => {
  Clipboard.setString(textToCopy);
};
