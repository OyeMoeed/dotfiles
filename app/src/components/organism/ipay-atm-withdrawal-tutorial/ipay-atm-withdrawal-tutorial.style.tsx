import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const tutorialStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: moderateScale(20, 0.3),
      marginVertical: verticalScale(4),
    },
    videoPlayerView: {
      width: '100%',
      height: verticalScale(158),
      borderRadius: moderateScale(16),
      overflow: 'hidden',
    },
    tutorialView: {
      backgroundColor: colors.natural.natural0,
      height: verticalScale(56),
      paddingHorizontal: moderateScale(16, 0.3),
      borderRadius: moderateScale(28),
      alignItems: 'center',
      flexDirection: 'row',
    },
    index: {
      width: scaleSize(32),
      height: scaleSize(32),
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
    tutorialListView: {
      flex: 1,
      marginTop: verticalScale(20),
    },
    itemSeparatorStyle: { height: verticalScale(8) },
  });

export default tutorialStyles;
