import { scaleSize } from '@app/styles/mixins';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const offerDetailsStyles = () =>
  StyleSheet.create({
    bottomButtonContainer: {
      flexDirection: 'row',
      gap: verticalScale(12),
      marginBottom: verticalScale(24),
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    flexStyle: {
      flex: 1,
    },
    lineImageStyle: {
      height: '85%',
    },
    offerContainerStyle: {
      height: scaleSize(150),
      marginTop: verticalScale(20),
      width: '100%',
    },
    offerImageStyle: {
      height: scaleSize(70),
      width: scaleSize(70),
    },
  });

export default offerDetailsStyles;
