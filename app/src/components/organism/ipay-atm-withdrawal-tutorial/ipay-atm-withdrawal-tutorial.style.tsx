import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const tutorialStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: moderateScale(16, 0.3),
      marginVertical: verticalScale(8),
    },
    videoPlayerView: {
      width: '100%',
      height: verticalScale(171),
      borderRadius: moderateScale(16),
      overflow: 'hidden',
    },
    tutorialView: {
      backgroundColor: colors.natural.natural0,
      height: moderateScale(68, 0.3),
      paddingHorizontal: moderateScale(16, 0.3),
      borderRadius: moderateScale(28),
      alignItems: 'center',
      flexDirection: 'row',
    },
    index: {
      width: scale(32),
      padding: moderateScale(8),
      borderRadius: moderateScale(11),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary.primary10,
    },
    tutorialTitle: {
      marginStart: moderateScale(12, 0.3),
      width: scale(240),
      color: colors.primary.primary800,
    },
    tutorialListView: { flex: 1, marginVertical: verticalScale(24) },
    itemSeparatorStyle: { height: verticalScale(8) },
  });

export default tutorialStyles;
