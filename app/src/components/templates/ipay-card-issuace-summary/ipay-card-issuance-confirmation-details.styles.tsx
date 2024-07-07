import colors from "@app/styles/colors.const";
import createStyleSheet from "@app/styles/scaled-sheet.styles";
import { FONT_SIZE_13 } from "@app/styles/typography.styles";
import { moderateScale } from "react-native-size-matters";

const CardIssuaceConfirmationStyles = (themeColors: typeof colors) => createStyleSheet({
  container: {
    flex: 1,
    marginBottom: moderateScale(16),
    marginHorizontal: moderateScale(16),
  },
  gradientView: {
    backgroundColor: themeColors.backgrounds.successBackground,
    padding: moderateScale(16),
    justifyContent: 'space-between',
    borderRadius: moderateScale(28),
  },
  titleText: {
    color: themeColors.natural.natural900,
    fontSize: FONT_SIZE_13,
  },
  upperListContainer: {
    marginTop: moderateScale(24)
  },
  listContainer: {
    gap: moderateScale(12)
  },
  termsAndConditionsParentView: {
    width: '100%',
    backgroundColor: colors.natural.natural0,
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(18),
    paddingVertical: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  termsAndConditionsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  termAndConditionsText: {
    flex: 1,
    marginStart: moderateScale(16),
    marginEnd: moderateScale(10),
    color: colors.natural.natural900,
  },
  detailsText: {
    color: themeColors.primary.primary800
  }

})
export default CardIssuaceConfirmationStyles
