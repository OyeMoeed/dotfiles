import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { verticalScale } from 'react-native-size-matters';

const beneficiaryAcivationStyles = (colors: typeof themeColors) =>
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
    },
    buttonWrapper: {
      width: '90%',
      marginTop: scaleFont(100),
      marginBottom: scaleFont(20),
      gap: scaleFont(12),
    },
    descriptionStyle: {
      marginTop: scaleFont(12),
      width: '80%',
    },
  });

export default beneficiaryAcivationStyles;
