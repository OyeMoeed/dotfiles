import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const topupIbanStyles = (colors: any) =>
  createStyleSheet({
    mainWrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      gap: moderateScale(5),
      paddingHorizontal: moderateScale(20),
    },
    containerStyle: {
      backgroundColor: 'transparent',
      paddingHorizontal: 0,
    },
    rightTextStyle: {
      color: colors.primary.primary900,
    },
    toastContainer: {
      position: 'absolute',
      bottom: verticalScale(90),
      left: verticalScale(18),
      width: '100%',
      backgroundColor: colors.success.success500,
      borderColor: colors.success.success500,
    },
    textStyle: {
      color: colors.natural.natural500,
    },
    informStyle: {
      marginTop: moderateScale(30)
    },
    shareBtn: {
      position: 'absolute',
      width: '100%',
      bottom: verticalScale(30),
      left: verticalScale(18),
    },
    pageDescriptionStyle: {
      gap: moderateScale(8),
      marginBottom: moderateScale(15),
    },
    leftIconContainerStyles: {
      alignSelf: 'flex-start'
    },
  });

export default topupIbanStyles;
