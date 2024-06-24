import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = (colors: any) =>
  createStyleSheet({
    mainContiner: {
      backgroundColor: 'transparent'
    },
    container: {
      minWidth: '100%',
      minHeight: verticalScale(48),
      height: 'auto',
      borderRadius: moderateScale(16),
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(12),
      marginTop: moderateScale(5)
    },
    font: {
      fontSize: moderateScale(12),
      color: colors.natural.natural500
    },
    commonContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    leftIconContainer: {
      marginRight: moderateScale(10)
    },
    rightIconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: moderateScale(10),
      gap: moderateScale(10)
    },
    btnStyle: {
      minWidth: spacing.CUSTOME_SCALE(74),
      minHeight: verticalScale(32),
      width: 'auto',
      backgroundColor: colors.tertiary.tertiary50,
      borderRadius: moderateScale(12),
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnTextStyle: {
      fontSize: spacing.CUSTOME_SCALE(15),
      color: colors.tertiary.tertiary600
    },
    btnTimeContainer: {
      minWidth: spacing.CUSTOME_SCALE(87),
      backgroundColor: colors.primary.primary50,
      marginLeft: moderateScale(8)
    },
    btnTimeTextStyle: {
      color: colors.primary.primary600
    },
    detailTextStyle: {
      color: colors.primary.primary800
    },
    subTitleStyle: {
      fontSize: moderateScale(14),
      color: colors.natural.natural900
    },
    copyText: {
      color: colors.primary.primary500
    },
    buttonStyle: {
      marginTop: moderateScale(15),
      width: 92,
      height: 34,
      backgroundColor: colors.secondary.secondary100,
      borderRadius: spacing.CUSTOME_SCALE(12),
      justifyContent: 'center'
    }
  });

export default styles;
