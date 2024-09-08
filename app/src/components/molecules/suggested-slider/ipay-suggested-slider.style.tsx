import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_10, SCALE_16, SCALE_28, SCALE_4, SCALE_48, SCALE_70, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_11, FONT_SIZE_12, FONT_SIZE_14 } from '@app/styles/typography.styles';

const styles = createStyleSheet({
  mainContainer: {
    width: spacing.CUSTOME_SCALE(270),
    height: spacing.CUSTOME_SCALE(270),
    borderRadius: SCALE_48,
    marginVertical: SCALE_16,
    marginHorizontal: SCALE_10,
  },
  container: {
    paddingVertical: SCALE_28,
    paddingHorizontal: spacing.CUSTOME_SCALE(23),
    borderRadius: SCALE_48,
    justifyContent: 'space-between',
  },
  commonConStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: spacing.CUSTOME_SCALE(192),
    height: spacing.CUSTOME_SCALE(153),
  },
  footnoteTextStyle: {
    fontWeight: '400',
    fontSize: FONT_SIZE_12,
    color: colors.natural.natural900,
  },
  captionTextStyle: {
    fontSize: FONT_SIZE_11,
    alignSelf: 'center',
    marginTop: SCALE_4,
  },
  largeTextStyle: {
    fontWeight: '700',
    color: colors.natural.natural900,
  },
  subHeadingTextStyle: {
    fontSize: FONT_SIZE_14,
    fontWeight: '400',
    color: colors.natural.natural900,
  },
  historyContStyle: {
    width: '100%',
    height: SCALE_70,
    borderRadius: SCALE_28,
    backgroundColor: colors.white,
    marginVertical: SCALE_16,
  },
});

export default styles;
