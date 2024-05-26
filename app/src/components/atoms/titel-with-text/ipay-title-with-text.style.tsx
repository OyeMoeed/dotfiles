import { spacing } from '@app/styles/spacing.styles';
import { StyleSheet } from 'react-native';
import { constants } from '../text/constants.text';

const titleWithTextStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginStart: spacing.SCALE_12
    },
    heading: {
      color: colors.primary.primary900,
      fontSize: constants.FONT_VARIANTS.FOOTNOTE.FONT_SIZE,
      lineHeight: constants.FONT_VARIANTS.FOOTNOTE.LINE_HEIGHT,
      letterSpacing: constants.FONT_VARIANTS.FOOTNOTE.LETTER_SPACING,
      fontFamily: constants.FONT_FAMILY.REGULAR
    },
    subHeading: {
      color: colors.natural.natural900,
      fontSize: constants.FONT_VARIANTS.CAPTION1.FONT_SIZE,
      lineHeight: constants.FONT_VARIANTS.CAPTION1.LINE_HEIGHT,
      letterSpacing: constants.FONT_VARIANTS.CAPTION1.LETTER_SPACING,
      fontFamily: constants.FONT_FAMILY.REGULAR
    }
  });

export default titleWithTextStyles;
