
import { scaleSize } from "@app/styles/mixins";
import createStyleSheet from "@app/styles/scaled-sheet.styles";
import { FONT_WEIGHT_BOLD, fonts } from "@app/styles/typography.styles";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const TopUpSuccessStyles = (colors: any) => createStyleSheet({
  container: {
    flex: 1,
    height: '100%',
    marginHorizontal: moderateScale(24, 0.3),
    alignItems: 'center',
  },
  failedVariant: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  failedText: {
    marginVertical: scaleSize(8),
    color: colors.error.error500
  },
  failedSubtitle: {
    alignItems: 'center',
    textAlign: 'center',  // Center text horizontally
    color: colors.primary.primary800
  },
  gradientTextSvg: {
    width: '100%',
    paddingHorizontal: moderateScale(24, 0.3),
  },
  linearGradientText: {
    fontSize: moderateScale(22),
    fontFamily: fonts.BOLD,
    marginBottom: moderateScale(12),
    color: colors.primary.primary800,
  },
  headlineText: {
    marginVertical: moderateScale(24),
    color: colors.primary.primary800,
    fontWeight: FONT_WEIGHT_BOLD,
  },
  linearGradientTextView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  failedButton: {
    alignItems: 'center',
    borderWidth: '0'
  },
  home: {
    marginBottom: moderateScale(30)
  },
  btnStyle: {
    marginBottom: scaleSize(30),
    justifyContent: 'center',
    paddingVertical: scaleSize(14),
    paddingHorizontal: scaleSize(20),
    backgroundColor: colors.primary.primary500,
    borderRadius: scaleSize(20)

  },
  text: {
    alignSelf: 'center',
    justfiyContent: 'center'
  },
  listContainer: {
    backgroundColor: colors.natural.natural0,

    width: '100%',
    borderRadius: scaleSize(16),
    marginBottom: scaleSize(8),
  },


  logoStyles: {
    alignSelf: 'center',
    width: verticalScale(84),
    height: verticalScale(28),
  },

  innerLinearGradientView: {

    borderRadius: scaleSize(48),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleSize(50),
    marginTop: scaleSize(20),
    width: '100%',
    paddingHorizontal: moderateScale(20, 0.3),
  },
  cardButton: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: scaleSize(10),
    justifyContent: 'space-around',
  },
  listView: {
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(18),
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  listDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: { color: colors.primary.primary800 },

  newTopup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleSize(16)

  },
  newTopupText: {
    color: colors.primary.primary500,

    marginLeft: scaleSize(6),
  },
  appleIcon: {
    alignItems: 'center',
    marginLeft: scaleSize(6),
  },

  detailesFlex: {
    flex: 0,

  },
  topupContainer: {
    alignItems: 'center',
  },
  successIcon: {
    alignSelf: 'center',
    marginTop: scaleSize(12),
    width: scale(80),
    height: verticalScale(80),

  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: scaleSize(16)
  }
});

export default TopUpSuccessStyles;

