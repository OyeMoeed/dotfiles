import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const IPayDescriptiveCardStyles = (theme: typeof colors) =>
  createStyleSheet({
    cardBackground: {
      backgroundColor: theme.natural.natural0,
      borderRadius: moderateScale(24),
      justifyContent: 'center',
      alignItems: 'center',
      gap: moderateScale(16),
      padding: moderateScale(12),
      paddingBottom: moderateScale(16),
    },
    flex: {
      flex: 0,
    },
    cardContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: moderateScale(5),
    },
    image: {
      height: moderateScale(141),
      width: moderateScale(141),
      borderRadius: moderateScale(12),
    },
    singleImage: {
      height: moderateScale(105),
      width: moderateScale(73),
      borderRadius: moderateScale(12),
    },
    imageBackground: {
      backgroundColor: theme.primary.primary10,
      height: moderateScale(141),
      width: moderateScale(141),
      borderRadius: moderateScale(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageFallbackBackground: {
      backgroundColor: theme.natural.natural100,
      height: moderateScale(141),
      width: moderateScale(141),
      borderRadius: moderateScale(12),
      justifyContent: 'center',
      alignItems: 'center',
    },

    textContainer: {
      backgroundColor: theme.natural.natural100,
      paddingVertical: moderateScale(2),
      paddingHorizontal: moderateScale(10),
      borderRadius: moderateScale(8),
    },
    priceTextContainer: {
      backgroundColor: theme.natural.natural100,
      paddingVertical: moderateScale(2),
      paddingHorizontal: moderateScale(10),
      borderRadius: moderateScale(8),
      alignSelf: 'flex-start',
    },

    textWidth: {
      textAlign: 'center',
      width: moderateScale(110),
    },
    priceTextWidth: {
      alignSelf: 'flex-start',
      width: moderateScale(130),
    },

    priceButton: {
      flexDirection: 'row',
      width: moderateScale(135),
      justifyContent: 'space-between',
    },
    chip: {
      backgroundColor: theme.primary.primary100,
      paddingVertical: moderateScale(2),
      paddingHorizontal: moderateScale(10),
      position: 'absolute',
      top: 0,
    },
  });

export default IPayDescriptiveCardStyles;
