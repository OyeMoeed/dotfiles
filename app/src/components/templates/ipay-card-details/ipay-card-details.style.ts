import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { CUSTOME_SCALE } from '@app/styles/spacing.const';
import { moderateScale } from 'react-native-size-matters';

const cardDetailsStyle = (colors: any) =>
  createStyleSheet({
    cardStyle: {
      flexDirection: 'row',
      width: CUSTOME_SCALE(311),
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
      marginTop: scaleSize(8),
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(18),
      paddingVertical: scaleSize(15),
    },
    headingStyles: {
      fontSize: moderateScale(13),
    },
    actionWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: moderateScale(8),
    },
    toast: {
      marginBottom: scaleFont(50),
    },
  });

export default cardDetailsStyle;
