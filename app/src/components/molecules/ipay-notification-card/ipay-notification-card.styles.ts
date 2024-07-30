import { Colors } from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const getNotificationCardStyles = (colors: Colors) => createStyleSheet({
    cardContainer: {
      backgroundColor: colors.primary.primary10,
      padding: moderateScale(12),
      borderRadius: moderateScale(16),
    },
    row: {
      flexDirection: 'row',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: moderateScale(8),
      marginRight: moderateScale(8),
      backgroundColor: colors.natural.natural0,
      borderRadius:moderateScale(11.08)
    },
    textContainer: {
      flex: 1,
    },
    title: {
      marginBottom: moderateScale(8),
    },
    message: {
      marginBottom: moderateScale(12),
    },
    moreIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot:{
        width: moderateScale(15),
        height: moderateScale(15),
        position: 'absolute',
        top: moderateScale(-3),
        left: moderateScale(-3),
        borderRadius: 50,
        borderWidth:moderateScale(3),
        borderColor:colors.primary.primary10,
        backgroundColor: colors.secondary.secondary500,
    }
  });

export default getNotificationCardStyles;
