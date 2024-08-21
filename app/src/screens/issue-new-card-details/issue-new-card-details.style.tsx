import { heightPercent, widthPercent } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const issueNewCardDetailsStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    headerGap: {
      marginVertical: verticalScale(8),
      marginHorizontal: moderateScale(24),
    },
    background: {
      width: widthPercent('100%'),
      height: heightPercent('30%'),
      resizeMode: 'stretch',
      justifyContent: 'flex-start',
    },
    animatedContainer: {
      backgroundColor: colors.natural.natural100,
      flex: 1,
    },
    bottomContainer: {
      justifyContent: 'flex-end',
      padding: moderateScale(24),
      paddingTop: moderateScale(0),
      backgroundColor: colors.natural.natural100,
    },
    marginStyles: { marginBottom: verticalScale(12) },
    expandedBorderRadius: {
      borderTopLeftRadius: moderateScale(48),
      borderTopRightRadius: moderateScale(48),
    },
    outStyles: {
      marginTop: verticalScale(24),
    },
    naturalBg: {
      backgroundColor: colors.natural.natural100,
    },
    genericPadding: {
      padding: moderateScale(24),
    },
    expandedButtonStyles: {
      position: 'absolute',
      bottom: -moderateScale(210),
      zIndex: 1000,
      alignSelf: 'center',
    },
    heightedView: {
      height: moderateScale(600),
    },
  });

export default issueNewCardDetailsStyles;
