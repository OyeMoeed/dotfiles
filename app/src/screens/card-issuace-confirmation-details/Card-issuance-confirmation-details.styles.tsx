import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardIssuanceConfirmationStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginBottom: moderateScale(28),
      marginHorizontal: moderateScale(16),
      marginTop: verticalScale(15),
    },
    gradientView: {
      backgroundColor: colors.primary.primary50,
      padding: moderateScale(16),
      justifyContent: 'space-between',
      borderRadius: moderateScale(28),
      flex: 1,
    },
    titleText: {
      color: themeColors.natural.natural900,
    },
    upperListContainer: {
      marginTop: moderateScale(12),
    },
    listContainer: {
      gap: moderateScale(12),
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
      color: themeColors.primary.primary800,
    },
    flatList: {
      flex: 0,
    },
    labelDetailsText: {
      flex: 2,
      justifyContent: 'flex-end',
    },
    labelContainerStyle: {
      flex: 1,
      justifyContent: 'space-between',
    },
  });
export default cardIssuanceConfirmationStyles;
