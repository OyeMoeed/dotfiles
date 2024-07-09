import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import {
  SCALE_10,
  SCALE_100,
  SCALE_12,
  SCALE_16,
  SCALE_32,
  SCALE_4,
  SCALE_8,
  spacing,
} from '@app/styles/spacing.const';
import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  captionTextStyle: {
    color: colors.primary.primary800,
    fontSize: SCALE_12,
    fontWeight: '700',
    marginLeft: SCALE_4,
  },
  captionsTextStyle: {
    color: colors.primary.primary900,
    fontSize: SCALE_10,
    fontWeight: '400',
    marginTop: verticalScale(10),
  },
  commonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    width: '100%',
  },
  container: {
    borderRadius: SCALE_16,
    height: 'auto',
    marginHorizontal: SCALE_8,
    marginVertical: SCALE_16,
    minHeight: verticalScale(124),
    overflow: 'hidden',
    width: scaleSize(243),
  },
  detailsWrapperView: {
    height: spacing.CUSTOME_SCALE(74),
    justifyContent: 'space-between',
  },
  footnoteTextStyle: {
    color: colors.natural.natural900,
    fontSize: SCALE_12,
    fontWeight: '400',
    height: verticalScale(18),
    width: scale(66),
  },
  headingTextStyle: {
    color: colors.primary.primary800,
    fontSize: SCALE_16,
    fontWeight: '700',
  },
  imageStyle: {
    borderRadius: scaleFont(8),
    height: verticalScale(36),
    resizeMode: 'contain',
    width: scaleSize(36),
  },
  lastOffer: { marginRight: scaleFont(24) },
  leftCircleStyle: {
    backgroundColor: colors.backgrounds.greyOverlay,
    borderRadius: SCALE_100,
    height: SCALE_32,
    marginLeft: spacing.CUSTOME_SCALE(-15),
    width: SCALE_32,
  },
  lineImageStyle: {
    height: spacing.CUSTOME_SCALE(76),
    width: spacing.CUSTOME_SCALE(2),
  },
  offerDetailsContainer: {
    height: spacing.CUSTOME_SCALE(76),
    justifyContent: 'space-between',
  },
  percentageTextStyle: {
    color: colors.primary.primary800,
    fontSize: SCALE_12,
    fontWeight: '700',
  },
  rightCircleStyle: {
    backgroundColor: colors.backgrounds.greyOverlay,
    borderRadius: SCALE_100,
    height: SCALE_32,
    marginRight: spacing.CUSTOME_SCALE(-15),
    width: SCALE_32,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(22),
    justifyContent: 'center',
  },
});

export default styles;
