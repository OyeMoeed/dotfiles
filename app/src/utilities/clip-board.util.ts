import Clipboard from '@react-native-clipboard/clipboard';

const copyText = (textToCopy: string) => {
  Clipboard.setString(textToCopy);
};

export default copyText;
