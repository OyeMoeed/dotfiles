import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const musanedPaySalaryConfirm = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: moderateScale(24, 0.3),
    },
    buttonContainer: {
      marginBottom: 30,
      marginHorizontal: 24,
    },
    walletBackground: {
      marginBottom: moderateScale(12),
      backgroundColor: themeColors.backgrounds.successBackground,
      padding: moderateScale(16),
      borderRadius: moderateScale(22),
    },
    detailsFlex: {
      flex: 0,
    },
    subHeadline: {
      color: themeColors.primary.primary800,
      marginStart: moderateScale(8, 0.3),
      textAlign: 'right',
    },
    personalInfoCardTitleText: {
      color: themeColors.natural.natural900,
      width: '40%',
      textAlign: 'left',
    },
    cardStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: themeColors.natural.natural0,
      marginTop: scaleSize(10),
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(18),
      paddingVertical: scaleSize(12),
    },
    detailsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '60%',
    },
  });

export default musanedPaySalaryConfirm;
