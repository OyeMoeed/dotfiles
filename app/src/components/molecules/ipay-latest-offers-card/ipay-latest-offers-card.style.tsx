import colors from '@app/styles/colors.const';
import {
  SCALE_10,
  SCALE_100,
  SCALE_12,
  SCALE_16,
  SCALE_32,
  SCALE_4,
  SCALE_48,
  SCALE_8,
  spacing,
} from '@app/styles/spacing.const';
import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    minHeight: spacing.CUSTOME_SCALE(124),
    width: spacing.CUSTOME_SCALE(243),
    height: 'auto',
    borderRadius: SCALE_16,
    marginVertical: SCALE_16,
    overflow: 'hidden',
    marginBottom: SCALE_48,
    marginHorizontal: SCALE_8,
  },
  offerDetailsContainer: {
    height: spacing.CUSTOME_SCALE(76),
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: spacing.CUSTOME_SCALE(36),
    height: spacing.CUSTOME_SCALE(36),
    borderRadius: SCALE_8,
    resizeMode: 'contain',
  },
  lineImageStyle: {
    width: spacing.CUSTOME_SCALE(2),
    height: spacing.CUSTOME_SCALE(76),
  },
  commonContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftCircleStyle: {
    width: SCALE_32,
    height: SCALE_32,
    backgroundColor: colors.backgrounds.greyOverlay,
    borderRadius: SCALE_100,
    marginLeft: spacing.CUSTOME_SCALE(-15),
  },
  rightCircleStyle: {
    width: SCALE_32,
    height: SCALE_32,
    backgroundColor: colors.backgrounds.greyOverlay,
    borderRadius: SCALE_100,
    marginRight: spacing.CUSTOME_SCALE(-15),
  },
  footnoteTextStyle: {
    fontSize: SCALE_12,
    fontWeight: '400',
    color: colors.natural.natural900,
    width: scale(66),
    height: verticalScale(18),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(22),
    justifyContent: 'center',
  },
  percentageTextStyle: {
    fontSize: SCALE_12,
    fontWeight: '700',
    color: colors.primary.primary800,
  },
  headingTextStyle: {
    fontSize: SCALE_16,
    fontWeight: '700',
    color: colors.primary.primary800,
  },
  captionTextStyle: {
    fontSize: SCALE_12,
    fontWeight: '700',
    color: colors.primary.primary800,
    marginLeft: SCALE_4,
  },
  captionsTextStyle: {
    marginTop: verticalScale(10),
    fontWeight: '400',
    fontSize: SCALE_10,
    color: colors.primary.primary900,
  },
  detailsWrapperView: {
    height: spacing.CUSTOME_SCALE(74),
    justifyContent: 'space-between',
  },
});

export default styles;
