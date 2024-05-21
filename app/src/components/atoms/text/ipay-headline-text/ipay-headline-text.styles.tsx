import { StyleSheet } from 'react-native';
import constants from '../constants.text';

// Then use these styles within your component
const styles = StyleSheet.create({
  textStyle: {
    fontSize: constants.FONT_VARIANTS.HEADLINE.FONT_SIZE,
    lineHeight: constants.FONT_VARIANTS.HEADLINE.LINE_HEIGHT,
    letterSpacing: constants.FONT_VARIANTS.HEADLINE.LETTER_SPACING
  }
});

export default styles;
