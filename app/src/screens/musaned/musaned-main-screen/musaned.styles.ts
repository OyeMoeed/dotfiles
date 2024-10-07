import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const musanedStyle = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      marginBottom: moderateScale(22),
    },
    tabs: {
      marginHorizontal: moderateScale(24),
      gap: scaleSize(8),
      marginBottom: moderateScale(24),
      marginTop: moderateScale(14),
      borderWidth: moderateScale(0),
    },
    unselectedTab: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(10),
    },
    noResult: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateScale(200, 0.3),
    },
    noResultContent: {
      gap: 12,
    },
    requestButton: {
      backgroundColor: colors.primary.primary500,
      marginVertical: verticalScale(12),
      justifyContent: 'center',
      paddingHorizontal: scaleSize(20),
      paddingVertical: verticalScale(10),
      height: scaleSize(50),
      borderRadius: scaleSize(16),
    },
    requestNoResultButton: {
      backgroundColor: colors.primary.primary500,
      marginTop: moderateScale(21, 0.3),
      justifyContent: 'center',
      paddingHorizontal: moderateScale(33.5, 0.3),
      paddingVertical: moderateScale(7, 0.3),
      borderRadius: moderateScale(12, 0.3),
    },
    flatList: {
      flex: 0,
    },
    listContainer: {
      flex: 1,
      marginHorizontal: moderateScale(22),
    },
    listView: {
      marginBottom: moderateScale(12),
    },
    filterWrapper: {
      height: verticalScale(20),
      marginTop: moderateScale(24),
    },
    chipContainer: {
      marginBottom: 12,
      backgroundColor: colors.natural.natural100,
    },
    chipHeading: {
      paddingVertical: 12,
      width: '90%',
    },
    rejectThisRequestBtn: {
      height: moderateScale(48, 0.3),
      alignItems: 'center',
      paddingVertical: moderateScale(0),
      justifyContent: 'center',
    },
    rejectThisRequestCancelBtn: {
      height: moderateScale(56, 0.3),
    },
    contentContainerStyle: {
      flex: 1,
    },
    headerRightContent: {
      flexDirection: 'row',
      gap: moderateScale(4),
    },
    primaryButton: {
      width: '90%',
      marginTop: 32,
      marginBottom: 8,
    },
    secondButton: {
      width: '90%',
    },
  });

export default musanedStyle;
