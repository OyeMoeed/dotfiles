import createStyleSheet from "@app/styles/scaled-sheet.styles";
import { FONT_SIZE_12, FONT_SIZE_13 } from "@app/styles/typography.styles";
import { mode } from "crypto-js";
import { moderateScale } from "react-native-size-matters";

const CardIssueStyle = (colors) => createStyleSheet({
  margin: {
    paddingHorizontal: moderateScale(16)
  },
  headerRow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStyle: {
    gap: moderateScale(8)
  },
  titleColor: {
    color: colors.primary.primary900,
    marginVertical: moderateScale(8)
  },
  detailsStyle: {
    color: colors.natural.natural500,
    fontSize: FONT_SIZE_12
  },
  titleStyle: {
    color: colors.natural.natural900,
    fonstSize: FONT_SIZE_13
  },
  buttonContainer: {
    marginTop: moderateScale(24)
  }
})

export default CardIssueStyle
