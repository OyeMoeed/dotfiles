import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_1, SCALE_10, SCALE_5 } from '@app/styles/spacing.const';
import { FONT_SIZE_14 } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const styles = (bgColor: string, titleColor: string, borderColour: string) =>
  createStyleSheet({
    mainContiner: {
      backgroundColor: 'transparent',
    },
    constainer: {
      position: 'absolute',
      left: moderateScale(15),
      zIndex: 10000,
      overflow: 'hidden',
      borderRadius: scaleSize(12),
      backgroundColor: bgColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: scaleSize(16),
      paddingVertical: verticalScale(12),
      marginTop: SCALE_5,
      borderWidth: SCALE_1,
      borderColor: borderColour,
      shadowColor: colors.natural.natural700,
      shadowOffset: {
        height: -4,
        width: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 3,
      width: scale(322),
      alignSelf: 'center',
    },
    font: {
      color: colors.natural.natural0,
      marginBottom: verticalScale(1),
    },
    commonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftIconContainer: {
      marginRight: moderateScale(12),
    },
    rightIconContainerText: {
      marginLeft: SCALE_10,
    },
    viewText: {
      color: titleColor,
    },
    subTitleStyle: {
      color: colors.natural.natural0,
    },
    rightIconContainer: {},
    toast: {},
    textView: { width: '80%' },
    toastSuccess: {
      backgroundColor: colors.tertiary.tertiary500,
      borderColor: colors.tertiary.tertiary500,
    },
    toastError: {
      backgroundColor: colors.error.error500,
      borderColor: colors.error.error500,
    },
    toastInformation: {
      backgroundColor: colors.secondary.secondary500,
      borderColor: colors.secondary.secondary500,
    },
    toastTitleText: {
      color: colors.natural.natural0,
      top: verticalScale(5),
    },
    onlyTitleContainer: {
      paddingVertical: scaleSize(2.75),
    },
    onlyTitleText: {
      color: colors.natural.natural0,
      top: scaleSize(6),
      fontSize: FONT_SIZE_14,
    },
    justifyCenter: {
      justifyContent: 'center',
    },
  });

export default styles;
