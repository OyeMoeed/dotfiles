import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_13, SCALE_12, SCALE_16, SCALE_28, SCALE_4, SCALE_48, spacing } from '@app/styles/spacing.const';
import { moderateScale } from 'react-native-size-matters';

const genratedStyles = (theme: any) =>
  createStyleSheet({
    listContainer: {
      marginVertical: SCALE_16,
    },
    rearrangeContStyle: {
      width: spacing.CUSTOME_SCALE(320),
      height: SCALE_48,
      borderRadius: SCALE_28,
      backgroundColor: theme.natural.natural0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SCALE_12,
      marginVertical: SCALE_4,
    },

    commonContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    footnoteTextStyle: {
      fontSize: FONT_SIZE_13,
      fontWeight: '400',
      lineHeight: moderateScale(18),
      color: theme.natural.natural900,
    },
  });

export default genratedStyles;
