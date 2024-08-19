import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const walletTransferStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    history: { flexDirection: 'row', flex: 1, gap: moderateScale(6), alignItems: 'center' },
    searchInputStyle: {
      height: verticalScale(36),
      marginBottom: moderateScale(24),
      backgroundColor: themeColors.natural.natural0,
      borderRadius: moderateScale(12),
    },
    phoneInputStyle: {
      height: verticalScale(54),
      marginBottom: moderateScale(12),
      backgroundColor: themeColors.natural.natural0,
      borderRadius: moderateScale(16),
    },
    phoneInputStyleMain: {
      marginBottom: moderateScale(12),
    },
    contactInfo: {
      flex: 1,
    },
    unsavedAndQr: { flexDirection: 'row', marginBottom: moderateScale(20) },
    unsaved: { flexDirection: 'row', flex: 1, gap: moderateScale(6), alignItems: 'center' },
    qr: { borderLeftWidth: 2, borderLeftColor: themeColors.primary.primary200, marginRight: moderateScale(16) },
    contactContainer: {
      marginTop: moderateScale(18),
      marginHorizontal: moderateScale(24),
      flex: 1,
    },
    submitContact: {
      marginBottom: moderateScale(24),
      backgroundColor: themeColors.transparent,
      overflow: 'hidden',
      padding: moderateScale(16),
      justifyContent: 'center',
      flex: 0.2,
      borderRadius: moderateScale(28),
      marginHorizontal: moderateScale(24),
      alignSelf: 'stretch',
    },
    checkmarkPoints: {
      backgroundColor: themeColors.backgrounds.greyOverlay,
      flexDirection: 'row',
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(8),
      alignItems: 'center',
      gap: moderateScale(16),
      width: '100%',
      marginBottom: moderateScale(8),
    },
    submitSection: {
      width: scaleSize(270),
      height: verticalScale(270),
      borderRadius: moderateScale(48),
      marginVertical: moderateScale(16),
      marginHorizontal: moderateScale(10),
    },
    contactCount: {
      flexDirection: 'row',
      marginBottom: moderateScale(8),
      gap: moderateScale(2),
    },
    selectedContactChip: {
      borderColor: themeColors.primary.primary500,
      borderWidth: 1,
      borderRadius: moderateScale(8),
    },
    selectedContactList: {
      gap: moderateScale(4),
    },
    contactChip: { flexDirection: 'row', alignItem: 'center', marginBottom: moderateScale(16) },
    unsavedBottomSheet: { width: '90%' },
    unsavedButton: {
      borderRadius: moderateScale(16),
      justifyContent: 'center',
      marginTop: moderateScale(12),
    },
    arrow: {
      marginTop: moderateScale(4),
    },
    inputStyle: {
      marginVertical: verticalScale(-12),
    },
    topMargin: {
      top: verticalScale(4),
    },
  });

export default walletTransferStyles;
