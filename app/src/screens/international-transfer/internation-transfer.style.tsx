import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const internationalTransferStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    headerRightContent: {
      flexDirection: 'row',
      gap: scaleFont(4),
    },
    capitalizeTitle: {
      textTransform: 'capitalize',
    },
    noResultContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      gap: verticalScale(24),
      paddingBottom: scaleFont(200),
    },
    noResult: {
      gap: verticalScale(12),
    },
    btnStyle: {
      width: scaleSize(227),
      height: verticalScale(34),
    },
    searchInputStyle: {
      height: verticalScale(36),
      marginTop: scaleFont(8),
      borderRadius: scaleFont(12),
      backgroundColor: themeColors.natural.natural0,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: scaleFont(20),
      paddingBottom: scaleFont(20),
    },
    tabWrapper: {
      backgroundColor: 'transparent',
      marginTop: scaleFont(8),
    },
    beneficiaryList: {
      flex: 1,
      justifyContent: 'space-between',
    },
    inputStyle: {
      height: verticalScale(36),
    },
    listWrapper: {
      marginTop: scaleFont(12),
      height: '100%',
    },
    bankLogo: {
      width: scaleSize(24),
      height: verticalScale(24),
      resizeMode: 'contain',
    },
    moreButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleFont(8),
    },
    listContentWrapper: {
      flex: 1,
      paddingBottom: scaleFont(90),
    },
    listCenterContainer: {
      paddingRight: scaleFont(6),
    },
    buttonStyle: {
      justifyContent: 'center',
    },
    listItem: {
      marginTop: scaleFont(5),
    },
    gradientWrapper: {
      paddingHorizontal: scaleFont(20),
    },
    addBeneficiaryBtn: {
      marginBottom: scaleFont(10),
    },
  });

export default internationalTransferStyles;
