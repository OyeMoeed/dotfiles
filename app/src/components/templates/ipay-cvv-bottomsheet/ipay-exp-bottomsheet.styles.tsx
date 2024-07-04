import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const IPayExpBottomSheetStyles = (colors) =>
  createStyleSheet({
    headerText: {
      marginBottom: verticalScale(12),
      color: colors.primary.primary900,
    },
    subTitleText: {
      color: colors.natural.natural900,
    },
    half: {
      width: '60%',
    },
    half2: {
      width: '40%',
    },
    alignRight: {
      alignItems: 'flex-end',
    },
    sheetContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleSize(24),
      justifyContent: 'space-between',
      width: '100%',
      paddingLeft: moderateScale(24),
      paddingRight: moderateScale(36),
    },
    imageStyles: { height: moderateScale(134), width: moderateScale(134) },
  });
export default IPayExpBottomSheetStyles;
