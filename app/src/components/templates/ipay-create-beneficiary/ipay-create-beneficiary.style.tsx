import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const createBeneficiaryStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      paddingHorizontal: moderateScale(24),
      paddingTop: moderateScale(32),
      paddingBottom: moderateScale(16),
      gap: moderateScale(32),
      flex: 1,
    },
    innerContainer: {
      padding: moderateScale(24),
      gap: moderateScale(16),
      borderRadius: moderateScale(28),
      backgroundColor: themeColors.natural.natural0,
    },
    inputContainerStyle: {
      width: '100%',
      paddingHorizontal: moderateScale(20),
      backgroundColor: themeColors.natural.natural0,
      borderColor: themeColors.primary.primary100,
      height: verticalScale(54),
    },
    listContainerStyle: {
      backgroundColor: themeColors.primary.primary10,
    },
    inputVariant: {
      height: moderateScale(54, 0.35),
      borderRadius: scaleFont(16),
      borderWidth: scaleFont(1),
      borderColor: colors.primary.primary100,
      paddingVertical: scaleFont(8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: colors.natural.natural0,
    },

    rightTextStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
    },
    imgStyle: {
      height: verticalScale(18),
      width: scaleSize(18),
      resizeMode: 'contain',
    },
    btnStyle: {
      height: verticalScale(50),
      justifyContent: 'center',
      marginTop: moderateScale(32),
    },
    beneficiaryContainer: {
      padding: moderateScale(16),
      borderRadius: moderateScale(28),
      backgroundColor: themeColors.backgrounds.successBackground,
      justifyContent: 'space-between',
      height: '100%',
    },
    capitalizeText: {
      textTransform: 'uppercase',
    },
    flatlist: {
      flex: 0,
    },
    listTitleText: {
      textTransform: 'capitalize',
    },
    flatListWrapper: {
      gap: moderateScale(8),
    },
    rightContainer: {
      width: '50%',
      justifyContent: 'flex-end',
    },
  });

export default createBeneficiaryStyles;
