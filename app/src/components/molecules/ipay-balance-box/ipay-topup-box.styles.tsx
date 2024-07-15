import colors from "@app/styles/colors.const";
import createStyleSheet from "@app/styles/scaled-sheet.styles";
import { typography } from "@app/styles/typography.styles";
import { moderateScale, verticalScale } from "react-native-size-matters";

const topUpBoxStyles = (themeColors: typeof colors) => createStyleSheet({
  container: {
    paddingVertical: moderateScale(16),
  },
  accountBalanceView: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    backgroundColor: themeColors.natural.natural5,
    borderColor: colors.natural.natural0,
    paddingHorizontal: moderateScale(24, 0.3),
    paddingVertical: moderateScale(18),
    marginBottom: verticalScale(12),
  },
  textStyle: {
    marginRight: moderateScale(8),
    color: colors.natural.natural700,
  },
  commonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceContainer: {
    flexDirection: 'row',
  },
  currencyStyle: {
    marginLeft: moderateScale(3),
    alignSelf: 'flex-end',
  },
  btnStyle: {
    minHeight: moderateScale(34),
    width: moderateScale(99),
    height: 'auto',
    justifyContent: 'center',
  },
  gap: {
    marginTop: moderateScale(12),
  },
  lineBorderStyle: {
    borderWidth: 1,
    borderColor: colors.secondary.secondary100,
    width: '100%',
    marginVertical: verticalScale(16),
  },
  balanceTextStyle: {
    fontWeight: typography.BOLD_TEXT_STYLES.fontWeight
  },
  remainingBalanceView: {
    flexDirection: 'row',
  },
  nearestAtmView: {
    marginTop: verticalScale(24),
  },
})
export default topUpBoxStyles;
