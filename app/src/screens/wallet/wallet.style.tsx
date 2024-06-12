import { constants } from '@app/components/atoms/ipay-text/constants.text';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_1, SCALE_100, SCALE_12, SCALE_16, SCALE_20, SCALE_4, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_15, FONT_SIZE_26 } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const walletStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: moderateScale(24)
    },
    headerContainer: {
      width: '100%',
      height: moderateScale(50),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: moderateScale(53)
    },
    backContainerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    backbtnCon: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start'
    },
    backbtnText: {
      fontSize: moderateScale(15),
      lineHeight: moderateScale(20),
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      color: colors.primary.primary500,
      marginLeft: moderateScale(4)
    },
    headerTitleStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      fontSize: moderateScale(15),
      lineHeight: verticalScale(20),
      color: colors.primary.primary900
    },
    listContainer: {
      marginVertical: verticalScale(4)
    },
    footnoteTextStyle: {
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      fontSize: moderateScale(13),
      color: colors.natural.natural500,
      lineHeight: verticalScale(18)
    },
    progressBarContainer: {
      flexDirection: 'row'
    },
    rightTextStyle: {
      color: colors.primary.primary500,
      fontSize: FONT_SIZE_15,
      lineHeight: verticalScale(20),
      fontWeight: constants.FONT_WEIGHT_NORMAL
    },
    codeBarImageStyle: {
      width: scale(78),
      height: verticalScale(78)
    },
    codeBarTextStyle: {
      fontSize: moderateScale(17),
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      color: colors.primary.primary500,
      marginRight: SCALE_4,
      lineHeight: verticalScale(22),
      textAlign: 'center'
    },
    buttonContainer: {
      minWidth: moderateScale(320),
      width: '100%',
      height: verticalScale(50),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: SCALE_1,
      borderColor: colors.primary.primary500,
      borderRadius: SCALE_16,
      marginTop: SCALE_12
    },
    limitContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    progressContainer: {
      width: spacing.CUSTOME_SCALE(201),
      height: verticalScale(170),
      alignItems: 'center',
      justifyContent: 'center'
    },
    gradientBarStyle: {
      width: moderateScale(122),
      maxHeight: verticalScale(1),
      marginVertical: verticalScale(12)
    },
    limitTextStyle: {
      color: colors.primary.primary800,
      marginBottom: verticalScale(8)
    },
    titleTextStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_26,
      color: colors.green.green500
    },
    arcStyle: {
      borderRadius: SCALE_100
    },
    toastContainer: {
      marginTop: SCALE_20
    },
    titleStyle: {
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      fontSize: moderateScale(12),
      lineHeight: verticalScale(16),
      color: colors.natural.natural500
    },
    subTextStyle: {
      fontSize: moderateScale(13),
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      lineHeight: verticalScale(18),
      color: colors.primary.primary900
    },
    footnoteStyleText: {
      color: colors.primary.primary800,
      fontWeight: constants.FONT_WEIGHT_BOLD
    },
    footnoteOfTextStyle: {
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      color: colors.primary.primary800
    }
  });
export default walletStyles;
