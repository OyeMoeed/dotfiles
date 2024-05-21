import { StyleSheet } from 'react-native';
import constants from '../constants.text';

// Then use these styles within your component
const styles = StyleSheet.create({
  textStyle: {
    fontSize: constants.FONT_VARIANTS.TITLE2.FONT_SIZE,
    lineHeight: constants.FONT_VARIANTS.TITLE2.LINE_HEIGHT,
    letterSpacing: constants.FONT_VARIANTS.TITLE2.LETTER_SPACING
  }
});

export default styles;
