import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const pointRedemptionConfirmation = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    redemptionConfirmDetail: { flex: 1, paddingHorizontal: scaleSize(24) },
    redemptionCardStyle: {
      height: scaleSize(60),
      borderRadius: moderateScale(16),
      justifyContent: 'center',
    },
    redemptionInnerCardStyle: {
      justifyContent: 'center',
      marginVertical: 0,
      marginHorizontal: scaleSize(26),
    },
    redemptionHeaderStyle: {
      marginBottom: 0,
    },
    redemptionCardBackgroundImage: {
      bottom: scaleSize(-21),
    },
    gradientView: {
      marginVertical: scaleSize(12),
      backgroundColor: 'transparent',
      width: '100%',
      overflow: 'hidden',
      padding: scaleSize(20),
      justifyContent: 'center',
      flex: 0.2,
      borderRadius: scaleSize(16),
      alignSelf: 'stretch',
    },
    remainingDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: scaleSize(24),
    },
    confirmButton: {
      backgroundColor: colors.primary.primary500,
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(14),
      borderRadius: scaleSize(16),
      marginHorizontal: scaleSize(24),
      marginBottom: scaleSize(24),
    },
    listContainer: {
      backgroundColor: colors.natural.natural0,
      width: '100%',
      borderRadius: scaleSize(16),
      marginBottom: scaleSize(8),
    },
    listView: {
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(18),
      justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'row',
    },
    listDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default pointRedemptionConfirmation;
