import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_10, SCALE_100, SCALE_16, SCALE_32, SCALE_48, SCALE_8, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_11, FONT_SIZE_12, FONT_SIZE_13 } from '@app/styles/typography.styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    minHeight: spacing.CUSTOME_SCALE(124),
    width: spacing.CUSTOME_SCALE(263),
    height: 'auto',
    borderRadius: SCALE_16,
    marginVertical: SCALE_16,
    overflow: 'hidden',
    marginBottom: SCALE_48,
    marginHorizontal:SCALE_8
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
    width:'100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftCircleStyle: {
    width: SCALE_32,
    height: SCALE_32,
    backgroundColor: colors.greyPalette.greyOverlay,
    borderEndEndRadius: SCALE_100,
    borderStartEndRadius: SCALE_100,
    marginLeft: spacing.CUSTOME_SCALE(-15)
  },
  rightCircleStyle: {
    width: SCALE_32,
    height: SCALE_32,
    backgroundColor: colors.greyPalette.greyOverlay,
    borderStartStartRadius: SCALE_100,
    borderEndStartRadius: SCALE_100,
    marginRight: spacing.CUSTOME_SCALE(-15)
  },
  footnoteTextStyle: {
    fontSize: FONT_SIZE_13,
    fontWeight: '400',
    color: colors.natural.natural900
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headingTextStyle: {
    fontSize: scaleFont(17),
    fontWeight: '700',
    color: colors.primary.primary800
  },
  captionTextStyle: {
    fontSize: FONT_SIZE_12,
    fontWeight: '700',
    color: colors.primary.primary800
  },
  captionsTextStyle: {
    fontWeight: '400',
    fontSize: FONT_SIZE_11,
    color: colors.primary.primary900
  }
});

export default styles;
