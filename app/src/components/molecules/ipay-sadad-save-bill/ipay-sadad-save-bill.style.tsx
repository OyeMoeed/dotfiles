import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const sadadSaveBillStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    saveBillContainer: {
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scaleFont(28),
      paddingTop: verticalScale(12),
      paddingHorizontal: scaleFont(24),
      gap: scaleFont(12),
      paddingBottom: verticalScale(24),
    },
    saveBillStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    inputContainerStyle: {
      paddingLeft: scaleFont(20),
      paddingRight: scaleFont(40),
      backgroundColor: themeColors.natural.natural0,
      marginTop: moderateScale(11),
    },
    inputText: {
      paddingLeft: 0,
    },
  });

export default sadadSaveBillStyles;
