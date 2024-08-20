import { scaleSize } from '@app/styles/mixins';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const offerDetailsStyles = () =>
  StyleSheet.create({
    bottomButtonContainer: {
      flexDirection: 'row',
      gap: moderateScale(8),
      marginBottom: moderateScale(20),
      marginTop: moderateScale(13),
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    flexStyle: {
      flex: 1,
    },
    off: { fontWeight: '400' },
    lineImageStyle: {
      height: '85%',
    },
    offerContainerStyle: {
      height: verticalScale(150),
      marginBottom: moderateScale(16),
      marginTop: moderateScale(20),
      width: '100%',
    },
    offerImageStyle: {
      height: verticalScale(70),
      width: scaleSize(70),
    },
    alertBottom: { bottom: moderateScale(20) },
  });

export default offerDetailsStyles;
