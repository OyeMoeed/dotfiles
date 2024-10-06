import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_17, FONT_WEIGHT_NORMAL } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const internationalTransferStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginTop: moderateScale(8),
    },
    toast: {
      marginBottom: moderateScale(36),
    },
    headerRightContent: {
      flexDirection: 'row',
      gap: moderateScale(4),
    },
    capitalizeTitle: {
      textTransform: 'capitalize',
    },
    noResultContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: moderateScale(24),
      flex: 1,
    },
    noResult: {
      gap: moderateScale(12),
    },
    btnStyle: {
      width: scaleSize(227),
      height: verticalScale(34),
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: moderateScale(20),
      paddingBottom: moderateScale(20),
    },
    tabWrapper: {
      backgroundColor: 'transparent',
      marginTop: moderateScale(4),
    },
    beneficiaryList: {
      flex: 1,
      justifyContent: 'space-between',
    },
    inputStyle: {
      fontSize: FONT_SIZE_17,
      fontWeight: FONT_WEIGHT_NORMAL,
      lineHeight: 22,
    },
    listWrapper: {
      marginTop: moderateScale(20),
      height: '100%',
      paddingBottom: moderateScale(70),
    },
    moreButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
    },
    listContentWrapper: {
      flex: 1,
    },
    listCenterContainer: {
      paddingRight: moderateScale(6),
    },
    buttonStyle: {
      justifyContent: 'center',
    },
    listItem: {
      marginBottom: moderateScale(5),
    },
    gradientWrapper: {
      paddingHorizontal: moderateScale(20),
    },
    addBeneficiaryBtn: {
      marginBottom: moderateScale(10),
      height: verticalScale(50),
      justifyContent: 'center',
    },
    actionSheetStyle: {
      bottom: verticalScale(20),
    },
    editStyles: {
      width: '85%',
      gap: moderateScale(12),
    },
    inputStyles: { backgroundColor: colors.natural.natural0, borderRadius: moderateScale(16) },
    searchWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      marginTop: moderateScale(4),
    },
    searchInputStyle: {
      height: verticalScale(36),
      borderRadius: moderateScale(12),
      backgroundColor: themeColors.natural.natural0,
      maxWidth: '95%',
    },
    listHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: moderateScale(10),
    },
    listFooter: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: moderateScale(12),
      gap: moderateScale(6),
    },
    listMargin: {
      marginTop: moderateScale(10),
    },
    sheetContainer: {
      paddingHorizontal: moderateScale(20),
      gap: moderateScale(4),
      marginTop: moderateScale(6),
    },
    sheetHeader: {
      borderRadius: moderateScale(28),
    },
    sheetBackground: {
      backgroundColor: themeColors.primary.primary10,
      borderRadius: moderateScale(28),
    },
    listStyle: {
      borderRadius: moderateScale(20),
    },
    listButtonStyle: {
      justifyContent: 'center',
    },
    tabImg: {
      marginVertical: moderateScale(6),
      resizeMode: 'contain',
    },
    tabStyles: {
      height: verticalScale(30),
    },
    reverseList: {
      flexDirection: 'column-reverse',
    },
    activeInactiveListWrapper: {
      gap: moderateScale(12),
    },
    sheetContainerStyles: {
      alignItems: 'flex-start',
      flex: 1,
      width: '100%',
      paddingHorizontal: moderateScale(24),
    },
    bodyStyle: { bottom: verticalScale(8) },
  });

export default internationalTransferStyles;
