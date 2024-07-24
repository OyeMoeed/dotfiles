import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const dropdownStyles = (colors: any) =>
  createStyleSheet({
    container: {
   //  flex: 1,
      width: '100%',
      marginTop: scaleSize(10),
      paddingHorizontal: moderateScale(24, 0.3),
    },
    inputContainerStyle: {
      width: '100%',
      marginTop: spacing.CUSTOME_SCALE(12),
      paddingLeft: spacing.CUSTOME_SCALE(20),
      paddingRight: spacing.CUSTOME_SCALE(40),
      backgroundColor: colors.natural.natural0,
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
  });

export default dropdownStyles;
