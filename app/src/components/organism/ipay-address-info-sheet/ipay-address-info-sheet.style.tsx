import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const ipayAddressInfoSheetStyles = () =>
  createStyleSheet({
    containerStyle: {
      width: '100%',
      flexDirection: 'row',
      gap: moderateScale(20),
      paddingHorizontal: moderateScale(36),
      marginTop: verticalScale(12),
    },
    contentContainer: {
      flex: 1,
    },
    iconContainer: {
      height: scaleSize(84),
      width: scaleSize(84),
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconStyle: {
      height: '100%',
      width: '100%',
    },
    descriptionTextStyle: {
      marginTop: verticalScale(12),
    },
  });

export default ipayAddressInfoSheetStyles;
