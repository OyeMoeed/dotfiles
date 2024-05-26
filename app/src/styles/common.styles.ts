// common.styles.ts
import { typography } from '@app/components/atoms/text/utilities/typography-helper.util';
import { StyleSheet } from 'react-native';


const commonStyles = StyleSheet.create({
  subHeadlineText: {
    fontSize: typography.FONT_VARIANTS.SUB_HEADLINE.FONT_SIZE,
    lineHeight: typography.FONT_VARIANTS.SUB_HEADLINE.LINE_HEIGHT,
    letterSpacing: typography.FONT_VARIANTS.SUB_HEADLINE.LETTER_SPACING,
  },

});

export default commonStyles;
