import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const sadadFooterComponentStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    gradientView: {
      padding: moderateScale(16, 0.3),
      borderRadius: moderateScale(28),
      backgroundColor: colors.natural.natural0,
      gap: moderateScale(8),
    },
    detailsFlex: {
      flex: 0,
    },
    listLeftImg: {
      height: verticalScale(28),
      width: scaleSize(28),
      resizeMode: 'contain',
    },
    heightStyles: {
      borderRadius: moderateScale(16),
      marginVertical: moderateScale(8),
      minWidth: '100%',
      minHeight: verticalScale(38),
      height: 'auto',
      marginTop: moderateScale(0),
      backgroundColor: colors.primary.primary10,
    },
    textStyle: {
      color: colors.natural.natural900,
    },
    rowStyles: {
      flexDirection: 'row',
      gap: moderateScale(8),
      alignItems: 'center',
    },
    centerAlign: {
      alignSelf: 'center',
      marginBottom: moderateScale(24),
    },
    detailsText: {
      color: colors.primary.primary800,
    },
    boldStyles: { fontWeight: 'bold' },
    erroText: { color: colors.error.error500, fontWeight: 'bold' },
  });

export default sadadFooterComponentStyles;
