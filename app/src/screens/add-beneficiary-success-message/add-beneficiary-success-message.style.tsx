import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const beneficiarySuccessStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: scaleFont(24),
      paddingTop: scaleFont(16),
      paddingBottom: scaleFont(24),
      alignItems: 'center',
    },
    logoStyles: {
      width: scaleSize(86),
      height: verticalScale(28),
      marginTop: scaleFont(16),
      resizeMode: 'contain',
    },
    linearGradientView: {
      width: '100%',
      height: '100%',
      borderRadius: scaleFont(48),
      overflow: 'hidden',
    },
    innerLinearGradientView: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    headingStyle: {
      textAlign: 'center',
      width: '60%',
      margin: 'auto',
    },
    btnStyle: {
      width: scaleSize(250),
      borderRadius: scaleFont(12),
    },
    buttonWrapper: {
      width: '85%',
      marginTop: scaleFont(100),
      marginBottom: scaleFont(20),
      gap: scaleFont(12),
    },
    descriptionStyle: {
      marginTop: scaleFont(12),
      width: '80%',
    },
    sheetContainerStyles: {
      alignItems: 'flex-start',
      width: '100%',
      paddingHorizontal: moderateScale(24),
    },
    descriptionStyles: {
      color: colors.primary.primary900,
      marginBottom: verticalScale(8),
    },
    currentStyles: {
      flex: 1,
      width: '100%',
      gap: verticalScale(8),
    },
    callBtn: { width: '100%' },
    bodyStyle: { bottom: verticalScale(8) },
    portalSheet: {
      flex: undefined,
      alignItems: undefined,
      minHeight: 10,
    },
  });

export default beneficiarySuccessStyles;
