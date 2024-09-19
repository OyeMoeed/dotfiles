import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const iPayQuickActionsStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    textAmount: {
      color: colors.natural.natural300,
    },
    naturalStyles: {
      color: colors.natural.natural700,
    },
    buttonBg: {
      minWidth: scaleSize(76),
      backgroundColor: colors.secondary.secondary100,
      paddingVertical: scaleSize(7),
      borderRadius: scaleSize(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: moderateScale(8),
      marginTop: scaleSize(24),
    },
    cardsTypesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: moderateScale(4),
      marginTop: scaleSize(24),
      marginHorizontal: scaleSize(24),
    },
    visaImageContainer: {
      alignSelf: 'center',
      borderWidth: 5,
      borderRadius: scaleSize(10),
      borderColor: colors.transparent,
    },
    visaImage: {
      resizeMode: 'contain',
      height: moderateScale(37),
      width: moderateScale(50),
    },
    selectedCardContainer: {
      borderColor: colors.primary.primary500,
    },
  });
export default iPayQuickActionsStyles;
