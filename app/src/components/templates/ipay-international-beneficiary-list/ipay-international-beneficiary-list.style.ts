import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_17, FONT_WEIGHT_NORMAL } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const internationalBeneficiaryListStyle = (themeColors: typeof colors) =>
  createStyleSheet({
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

    addBeneficiaryBtn: {
      marginBottom: moderateScale(10),
      height: verticalScale(50),
      justifyContent: 'center',
    },

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

    reverseList: {
      flexDirection: 'column-reverse',
    },
    activeInactiveListWrapper: {
      gap: moderateScale(12),
    },
    loadingContainer: {
      marginTop: moderateScale(20),
      height: moderateScale(230),
    },
  });

export default internationalBeneficiaryListStyle;
