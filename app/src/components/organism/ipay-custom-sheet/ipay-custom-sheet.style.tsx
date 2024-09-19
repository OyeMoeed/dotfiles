import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { Dimensions } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const customSheetStyles = (theme: any) =>
  createStyleSheet({
    bottomSheetContainer: {
      height: WINDOW_HEIGHT - 140,
      width: '100%',
      position: 'absolute',
      top: WINDOW_HEIGHT,
    },
    innerStyle: {
      paddingBottom: verticalScale(380),
    },
    innerStyleOpen: {
      paddingBottom: verticalScale(100),
    },

    logoContainer: {
      width: '100%',
      paddingTop: moderateScale(16),
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: moderateScale(48),
      borderTopRightRadius: moderateScale(48),
    },
    childContainer: {
      backgroundColor: theme.natural.natural100,
      height: '100%',
      borderTopLeftRadius: moderateScale(48),
      borderTopRightRadius: moderateScale(48),
      marginTop: moderateScale(10),
      flex: 1,
      overflow: 'hidden',
    },
    arrowIcon: {
      alignItems: 'center',
      marginTop: 8,
    },
    rotateIcon: {
      transform: [{ rotate: '180deg' }],
    },
    touchableWithoutFeedbackViewStyle: {
      height: '100%',
      width: '100%',
      zIndex: 1,
      position: 'absolute',
    },
  });

export default customSheetStyles;
