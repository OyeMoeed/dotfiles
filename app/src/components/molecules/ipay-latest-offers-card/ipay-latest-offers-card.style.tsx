import { constants } from '@app/components/atoms/ipay-text/constants.text';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_100, SCALE_16, SCALE_32, SCALE_48, SCALE_8, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_11, FONT_SIZE_12, FONT_SIZE_13 } from '@app/styles/typography.styles';

const latestOfferStyles = (theme: any) =>
  createStyleSheet({
    container: {
      minHeight: spacing.CUSTOME_SCALE(124),
      width: spacing.CUSTOME_SCALE(263),
      height: 'auto',
      borderRadius: SCALE_16,
      marginVertical: SCALE_16,
      overflow: 'hidden',
      marginBottom: SCALE_48,
      marginHorizontal: SCALE_8
    },
    imageStyle: {
      width: spacing.CUSTOME_SCALE(36),
      height: spacing.CUSTOME_SCALE(36),
      borderRadius: SCALE_8
    },
    lineImageStyle: {
      width: spacing.CUSTOME_SCALE(2),
      height: spacing.CUSTOME_SCALE(76)
    },
    commonContainer: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    leftCircleStyle: {
      width: SCALE_32,
      height: SCALE_32,
      backgroundColor: theme.backgrounds.greyOverlay,
      borderEndEndRadius: SCALE_100,
      borderStartEndRadius: SCALE_100,
      marginLeft: spacing.CUSTOME_SCALE(-15)
    },
    rightCircleStyle: {
      width: SCALE_32,
      height: SCALE_32,
      backgroundColor: theme.backgrounds.greyOverlay,
      borderStartStartRadius: SCALE_100,
      borderEndStartRadius: SCALE_100,
      marginRight: spacing.CUSTOME_SCALE(-15)
    },
    footnoteTextStyle: {
      fontSize: FONT_SIZE_13,
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      color: theme.natural.natural900
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    headingTextStyle: {
      fontSize: scaleFont(17),
      fontWeight: constants.FONT_WEIGHT_BOLD,
      color: theme.primary.primary800
    },
    captionTextStyle: {
      fontSize: FONT_SIZE_12,
      fontWeight: constants.FONT_WEIGHT_BOLD,
      color: theme.primary.primary800
    },
    captionsTextStyle: {
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      fontSize: FONT_SIZE_11,
      color: theme.primary.primary900
    }
  });

export default latestOfferStyles;
