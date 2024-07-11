import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';
import { typography } from '../ipay-text/utilities/typography-helper.util';

const datePickerStyles = (themeColor: typeof colors) =>
  createStyleSheet({
    pickerContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    picker: {
      width: moderateScale(150),
      backgroundColor: 'transparent',
      height: moderateScale(160),
    },
    itemSize: {
      fontSize: typography.FONT_VARIANTS.TITLE3.FONT_SIZE,
      lineHeight: typography.FONT_VARIANTS.TITLE3.LINE_HEIGHT,
      letterSpacing: typography.FONT_VARIANTS.TITLE3.LETTER_SPACING,
      fontWeight: FONT_WEIGHT_BOLD,
      color: themeColor.primary.primary500,
    },
  });

export default datePickerStyles;
