import { scaleSize } from "@app/styles/mixins";
import createStyleSheet from "@app/styles/scaled-sheet.styles";
import { FONT_WEIGHT_BOLD } from "@app/styles/typography.styles";
import { verticalScale, moderateScale } from "react-native-size-matters";

const cardVerificationStyles = (colors) => createStyleSheet({

  cardNameInput: {
    marginTop: scaleSize(12),
    paddingRight: scaleSize(40),
    backgroundColor: colors.natural.natural0,
  },
  backgroundColor: {
    backgroundColor: colors.natural.natural0
  },
  container: {
    flex: 1,
    marginVertical: scaleSize(20),
    marginHorizontal: scaleSize(24)
  },
  headerText: {
    color: colors.primary.primary900,
    fontWeight: FONT_WEIGHT_BOLD
  },
  subtitleText: {
    color: colors.natural.natural900,
    marginBottom: scaleSize(12)
  },
  btnStyle: {
    width: '100%',
    marginTop: moderateScale(16),
  },

})
export default cardVerificationStyles
