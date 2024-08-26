import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const chooseBeneficiaryStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    buttonStyles: { margin: moderateScale(18), marginBottom: verticalScale(30) },
    inputStyle: {
      height: verticalScale(36),
    },
    listItem: {
      marginBottom: moderateScale(5),
    },
    bankLogo: {
      width: moderateScale(24),
      height: verticalScale(24),
      resizeMode: 'contain',
    },
    addBeneficiaryBtn: {
      flex: 1,
    },
    verticalStyles: { paddingBottom: verticalScale(40) },
    searchInputStyle: {
      height: verticalScale(36),
      borderRadius: moderateScale(12),
      backgroundColor: theme.natural.natural0,
      alignSelf: 'center',
    },
    innerStyles: {
      flex: 1,
      alignSelf: 'center',
      width: '90%',
      gap: verticalScale(12),
      marginTop: verticalScale(12),
    },
    listCenterContainer: {
      paddingRight: moderateScale(6),
    },
  });
export default chooseBeneficiaryStyles;
