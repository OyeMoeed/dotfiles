import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const termsStyles = (theme: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    menuItemView: {
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: moderateScale(18, 0.3),
      borderRadius: moderateScale(16),
      backgroundColor: theme.natural.natural0,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateScale(16),
      justifyContent: 'space-between',
    },
    menuItemTextWrapper: {
      flex: 1,
      justifyContent: 'flex-start',
      marginStart: moderateScale(12),
    },
    menuItemText: {
      marginTop: 0,
      marginBottom: 0,
    },
    termsAndConditionsView: {
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: moderateScale(10, 0.3),
      borderRadius: moderateScale(50),
      height: verticalScale(50),
      backgroundColor: theme.backgrounds.grayButtonBackground,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateScale(16),
    },
    iconWrapper: {
      alignItems: 'center',
      backgroundColor: theme.backgrounds.greyOverlay,
      borderRadius: scaleFont(14),
      flexDirection: 'row',
      height: verticalScale(48),
      justifyContent: 'center',
      padding: scaleFont(10),
      width: scaleSize(48),
    },
    header: {
      paddingHorizontal: 0,
    },
    headerTitle: {
      fontSize: scaleFont(14),
    },
  });

export default termsStyles;
