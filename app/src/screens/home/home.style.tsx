import { constants } from '@app/components/atoms/ipay-text/constants.text';
import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import { SCALE_12, SCALE_16, SCALE_24, SCALE_32, SCALE_48, SCALE_8, spacing } from '@app/styles/spacing.const';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.primary.primary100,
  },
  outerWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topNavCon: {
    marginTop: SCALE_16,
    marginHorizontal: SCALE_24,
  },
  balanceCon: {
    marginTop: SCALE_16,
    marginHorizontal: SCALE_24,
  },
  topNavConStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageStyle: {
    width: SCALE_32,
    height: SCALE_32,
    marginRight: SCALE_8,
  },
  leftNavConStyle: {
    flexDirection: 'row',
  },
  buttonStyle: {
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScale(30),
    borderWidth: moderateScale(0.5),

    borderRadius: moderateScale(10),
  },
  ListView: {
    borderBottomWidth: moderateScale(1),
    padding: moderateScale(1),
    marginTop: moderateScale(10),
  },
  text: {
    fontSize: scaleFont(16),
    color: colors.white,
    fontWeight: constants.FONT_WEIGHT_EXTRA_BOLD,
  },
  addGap: {
    gap: SCALE_12,
  },
  popTextStyle: {
    color: colors.primary.primary500,
  },
  listContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  nameStyle: {
    fontSize: spacing.CUSTOME_SCALE(15),
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  bottomSheetContainerStyle: {
    backgroundColor: colors.greyPalette.greyOverlay,
    borderTopStartRadius: SCALE_48,
    borderTopEndRadius: SCALE_48,
    overflow: 'hidden',
  },
  listStyleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.CUSTOME_SCALE(18),
    paddingHorizontal: spacing.CUSTOME_SCALE(12),
    width: spacing.CUSTOME_SCALE(318),
    height: verticalScale(48),
    backgroundColor: colors.white,
    borderRadius: SCALE_16,
    marginVertical: verticalScale(4),
  },
});

export default styles;
