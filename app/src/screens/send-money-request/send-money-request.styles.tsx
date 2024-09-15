import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { Platform } from 'react-native';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';

const sendMoneyFormStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    history: { flexDirection: 'row', flex: 1, gap: scaleSize(6), alignItems: 'center' },
    contactInfoContainer: {
      flexDirection: 'row',
      gap: moderateScale(2),
      marginTop: moderateScale(10),
    },
    inncerContainer: {
      marginTop: moderateScale(22),
      marginHorizontal: moderateScale(24, 0.2),
      flex: 1,
    },
    listContainer: {
      marginHorizontal: moderateScale(16),
    },
    buttonBackground: {
      flex: 0,
      backgroundColor: theme.appGradient.buttonBackground,
      borderRadius: moderateScale(24),
      ...Platform.select({
        android: {
          padding: moderateScale(11),
        },
        ios: {
          padding: moderateScale(16),
        },
      }),
      marginTop: moderateVerticalScale(8),
      gap: moderateScale(8),
      marginBottom: moderateVerticalScale(28),
    },
    alert: {
      marginBottom: moderateScale(32),
    },
    button: {
      justifyContent: 'center',
    },
    reasonItemStyle: {
      borderRadius: scaleSize(20),
    },
    reasonItemCardStyle: {
      marginBottom: verticalScale(2.5),
    },
    messageStyle: {
      marginBottom: verticalScale(12),
    },
  });

export default sendMoneyFormStyles;