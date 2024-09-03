import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const localTransferStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
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
      height: '100%',
      gap: moderateScale(24),
    },
    noResult: {
      gap: moderateScale(12),
    },
    btnStyle: {
      width: scaleSize(227),
      height: verticalScale(34),
    },
    searchInputStyle: {
      height: verticalScale(36),
      marginTop: moderateScale(10),
      borderRadius: moderateScale(12),
      backgroundColor: themeColors.natural.natural0,
      minWidth: '90%',
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: moderateScale(24),
      marginBottom: moderateScale(12),
    },
    tabWrapper: {
      backgroundColor: 'transparent',
      marginTop: moderateScale(16),
    },
    beneficiaryList: {
      flex: 1,
      justifyContent: 'space-between',
    },
    inputStyle: {
      height: verticalScale(36),
    },
    listWrapper: {
      marginTop: moderateScale(20),
      gap: moderateScale(12),
      height: '100%',
    },
    textStyle: {
      fontWeight: FONT_WEIGHT_BOLD,
      // marginRight: moderateScale(4),
      textTransform: 'capitalize',
    },
    bankLogo: {
      width: moderateScale(24),
      height: moderateScale(24),
      resizeMode: 'contain',
    },
    moreButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(2),
    },
    listContentWrapper: {
      flex: 1,
      paddingBottom: scaleFont(100),
    },
    listCenterContainer: {
      paddingRight: moderateScale(12),
    },
    buttonStyle: {
      justifyContent: 'center',
    },
    actionSheetStyle: {
      bottom: moderateScale(20),
    },
    editStyles: {
      width: '85%',
      gap: moderateScale(12),
    },
    inputStyles: { backgroundColor: colors.natural.natural0, borderRadius: moderateScale(16) },
    sheetContainerStyles: {
      alignItems: 'flex-start',
      flex: 1,
      width: '100%',
      paddingHorizontal: moderateScale(24),
    },
    bodyStyle: { bottom: verticalScale(8) },
    centerAlign: { justifyContent: 'center' },
    searchWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      marginTop: moderateScale(16),
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
      marginTop: moderateScale(12),
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
    reverseList: {
      flexDirection: 'column-reverse',
    },
    activeInactiveListWrapper: {
      gap: moderateScale(12),
    },
  });

export default localTransferStyles;
