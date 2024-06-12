import { constants } from '@app/components/atoms/ipay-text/constants.text';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_18, SCALE_28, SCALE_8, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_11, FONT_SIZE_12 } from '@app/styles/typography.styles';
import { verticalScale } from 'react-native-size-matters';

const bannerStyles = (theme: any) =>
  createStyleSheet({
    container: {
      minWidth: '100%',
      height: spacing.CUSTOME_SCALE(90),
      backgroundColor: theme.natural.natural150,
      borderRadius: SCALE_28,
      paddingRight: spacing.CUSTOME_SCALE(17),
      overflow: 'hidden',
      marginVertical: spacing.CUSTOME_SCALE(16),
    },
    subContainerStyle: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.natural.natural200,
      borderRadius: SCALE_28,
      paddingRight: spacing.CUSTOME_SCALE(17),
      overflow: 'hidden',
    },
    bannerContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.natural.natural0,
      borderRadius: SCALE_28,
      padding: SCALE_18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageStyle: {
      width: spacing.CUSTOME_SCALE(18),
      height: spacing.CUSTOME_SCALE(18),
      marginRight: SCALE_8,
    },
    footnoteTextStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_12,
      color: theme.natural.natural900,
    },
    commonContainer: {
      flexDirection: 'row',
    },
    captionStyle: {
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      fontSize: FONT_SIZE_11,
      color: theme.natural.natural900,
      marginTop: SCALE_8,
    },
    buttonStyle: {
      width: spacing.CUSTOME_SCALE(92),
      height: verticalScale(34),
      backgroundColor: theme.primary.primary500,
      borderRadius: spacing.CUSTOME_SCALE(12),
      justifyContent: 'center',
    },
  });

export default bannerStyles;
