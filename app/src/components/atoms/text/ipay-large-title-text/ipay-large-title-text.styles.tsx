import { StyleSheet } from 'react-native';
import constants from '../constants.text';

// Then use these styles within your component
const styles = StyleSheet.create({
  textStyle: {
    fontSize: constants.FONT_VARIANTS.TITLE_LARGE.FONT_SIZE,
    lineHeight: constants.FONT_VARIANTS.TITLE_LARGE.LINE_HEIGHT,
    letterSpacing: constants.FONT_VARIANTS.TITLE_LARGE.LETTER_SPACING
  }
});

export default styles;
