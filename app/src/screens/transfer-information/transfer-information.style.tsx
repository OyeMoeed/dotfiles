import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_17 } from '@app/styles/typography.styles';
import { Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const transferInformationStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: moderateScale(24, 0.3),
    },
    bankDetailsView: {
      flex: 1,
    },
    nextBtn: {
      marginBottom: moderateScale(46),
      borderRadius: moderateScale(16),
      marginHorizontal: moderateScale(24, 0.3),
    },
    buttonContainer: {
      paddingTop: moderateScale(32),
    },
    transferContainer: {
      marginTop: moderateScale(0),
    },
    topUpBtnStyle: {
      paddingHorizontal: moderateScale(14),
      paddingVertical: moderateScale(7),
      height: 'auto',
      borderRadius: moderateScale(12),
    },
    inputFieldStyle: {
      borderRadius: moderateScale(16),
    },
    currency: {
      fontSize: FONT_SIZE_17,
    },
    input: {
      paddingBottom: moderateScale(8),
    },
    inputActiveStyle: {
      ...Platform.select({
        android: {
          marginBottom: moderateScale(1),
        },
        ios: {
          marginBottom: 0,
        },
      }),
    },
  });

export default transferInformationStyles;
