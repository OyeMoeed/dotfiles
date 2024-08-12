import { scaleSize } from '@app/styles/mixins';
import themeColors from '@app/styles/theming/theme-colors';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardManagementStyles = (colors: typeof themeColors) =>
  StyleSheet.create({
    bottomSheetContainer: {
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(28),
      padding: scaleSize(20),
      width: '84%',
    },
    btnStyle: {
      marginTop: verticalScale(24),
      width: '50%',
    },
    cardListContainer: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: verticalScale(32),
    },
    container: {
      flex: 1,
    },
    contentContainerStyle: {
      gap: verticalScale(16),
      marginTop: verticalScale(4),
    },
    inputContainer: {
      width: '100%',
    },
    inputStyles: {
      marginTop: scaleSize(12),
      paddingRight: scaleSize(40),
    },
    listItemContainer: {
      backgroundColor: colors.primary.primary10,
      width: '110%',
    },
    noCardContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    noCardDesContainer: {
      alignItems: 'center',
      marginTop: verticalScale(12),
    },
    renderItemContainer: {
      alignSelf: 'flex-end',
      backgroundColor: colors.success.success25,
      borderRadius: scaleSize(16),
      marginBottom: verticalScale(-8),
      paddingHorizontal: moderateScale(10),
      paddingVertical: verticalScale(2),
      zIndex: 1,
    },
    sheetCardIcon: {
      alignItems: 'center',
      backgroundColor: colors.natural.natural0,
      borderColor: colors.primary.primary150,
      borderRadius: scaleSize(16),
      borderWidth: 1,
      height: scaleSize(48),
      justifyContent: 'center',
      width: scaleSize(48),
    },
    sheetCardIconSize: {
      height: '60%',
      width: '60%',
    },
  });

export default cardManagementStyles;
