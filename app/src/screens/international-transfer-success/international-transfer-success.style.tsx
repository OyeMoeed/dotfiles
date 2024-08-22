import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const internationalSuccessStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    childContainer: {
      flex: 1,
      borderRadius: moderateScale(48),
      backgroundColor: themeColors.natural.natural50,
      marginVertical: moderateScale(16),
      paddingHorizontal: moderateScale(15),
      paddingVertical: moderateScale(24),
    },
    boldStyles: { fontWeight: 'bold' },
    minFlex: {
      flex: 0,
    },
    bottomView: {
      paddingVertical: moderateScale(8),
    },
    rowStyles: {
      flexDirection: 'row',
      paddingBottom: moderateScale(4),
      justifyContent: 'space-around',
    },
    heightStyles: {
      borderRadius: moderateScale(16),
      marginVertical: moderateScale(8),
      minWidth: '100%',
      minHeight: verticalScale(38),
      height: 'auto',
      marginTop: moderateScale(0),
    },
    detailsText: {
      color: themeColors.primary.primary800,
    },
    listImage: {
      width: scaleSize(15),
      height: verticalScale(15),
      resizeMode: 'contain',
    },
  });

export default internationalSuccessStyles;
