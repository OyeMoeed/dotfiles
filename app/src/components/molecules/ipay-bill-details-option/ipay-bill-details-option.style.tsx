import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const sadadFooterComponentStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    title: {
      lineHeight: verticalScale(20),
    },
    gradientView: {
      padding: moderateScale(16, 0.3),
      borderRadius: moderateScale(28),
      backgroundColor: colors.natural.natural50,
      // gap: moderateScale(16),
      flex: 1,
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
    },
    textStyle: {
      color: colors.natural.natural900,
    },
    rowStyles: {
      flexDirection: 'row',
      gap: moderateScale(8),
      alignItems: 'center',
      marginBottom: moderateScale(8),
    },
    detailsText: {
      color: colors.primary.primary800,
    },
    columnList: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: moderateScale(6),
    },
    rightContainerStyle: {
      marginLeft: moderateScale(-4),
    },
  });

export default sadadFooterComponentStyles;
