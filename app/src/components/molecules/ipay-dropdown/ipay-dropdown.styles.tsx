import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const dropdownStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      marginTop: scaleSize(10),
      paddingHorizontal: moderateScale(24, 0.3),
    },

    searchBarView: {
      flexDirection: 'row',
      alignItems: 'center',
      height: verticalScale(35),
      overflow: 'hidden',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(12),
      paddingHorizontal: moderateScale(12, 0.3),
      marginBottom: verticalScale(18),
    },
    searchInputText: {
      flex: 1,
      paddingHorizontal: moderateScale(12, 0.3),
    },
    titleView: {
      backgroundColor: colors.natural.natural0,
      paddingHorizontal: moderateScale(18, 0.3),
      height: moderateScale(48),
      borderRadius: moderateScale(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemSeparatorStyle: {
      height: verticalScale(8),
    },
    noResultsView: {
      alignItems: 'center',
    },
    btnContainer: {
      height: isIosOS ? verticalScale(150) : verticalScale(80),
      paddingTop: verticalScale(10),
    },
  });

export default dropdownStyles;
