import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';

const physicalCardMainStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    cardsContainer: {
      alignItems: 'center',
    },
    headerText: {
      alignSelf: 'center',
      marginTop: verticalScale(24),
      marginBottom: verticalScale(16),
    },
    cardContainerParent: {
      height: verticalScale(364),
      width: scaleSize(230),
      backgroundColor: 'white',
      alignSelf: 'center',
      alignItems: 'center',
      padding: scaleSize(12),
      borderRadius: scaleSize(28),
    },
    cardContainerChild: {
      height: verticalScale(280),
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: scaleSize(28),
    },
    btnStyle: {
      justifyContent: 'center',
      width: '100%',
      marginTop: verticalScale(12),
      borderRadius: scaleSize(16),
    },
    cardPrintedContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
      alignItems: 'flex-end',
      flexDirection: 'row',
    },
    cardPrintedChildContainer: {
      paddingVertical: verticalScale(2),
      backgroundColor: colors.natural.natural100,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scaleSize(8),
      gap: moderateVerticalScale(8),
    },
    bottomContainer: {
      height: '23%',
      width: '100%',
      backgroundColor: colors.natural.natural0,
      position: 'absolute',
      bottom: 0,
      borderTopRightRadius: scaleSize(48),
      borderTopLeftRadius: scaleSize(48),
      alignItems: 'center',
      paddingTop: verticalScale(32),
      gap: verticalScale(16),
    },
    textCenter: {
      textAlign: 'center',
    },
    cardBackgroundStyle: {
      width: moderateScale(216),
    },
  });

export default physicalCardMainStyles;
