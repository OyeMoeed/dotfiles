import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const localTransferStyles = (theme: typeof colors) =>
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
      paddingBottom: scaleFont(100),
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
      marginTop: scaleFont(10),
      borderRadius: scaleFont(12),
      backgroundColor: theme.natural.natural0,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: scaleFont(20),
      paddingBottom: scaleFont(20),
    },
    tabWrapper: {
      backgroundColor: 'transparent',
      marginTop: scaleFont(16),
    },
    beneficiaryList: {
      flex: 1,
      justifyContent: 'space-between',
    },
    inputStyle: {
      height: verticalScale(36),
    },
    listWrapper: {
      marginTop: scaleFont(20),
      gap: scaleFont(12),
      height: '100%',
    },
    textStyle: {
      fontWeight: FONT_WEIGHT_BOLD,
    },
    bankLogo: {
      width: moderateScale(24),
      height: moderateScale(24),
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
    actionSheetStyle: {
      bottom: verticalScale(20),
    },
    editStyles: {
      width: '85%',
      gap: verticalScale(12),
    },
    inputStyles: { backgroundColor: colors.natural.natural0, borderRadius: moderateScale(16) },
  });

export default localTransferStyles;
