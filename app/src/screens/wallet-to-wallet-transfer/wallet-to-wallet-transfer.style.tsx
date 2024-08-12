import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_10, SCALE_16, SCALE_48 } from '@app/styles/spacing.const';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const walletTransferStyles = (colors: typeof themeColors, selectedContact: boolean) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    history: { flexDirection: 'row', flex: 1, gap: scaleSize(6), alignItems: 'center' },
    searchInputStyle: {
      height: verticalScale(36),
      marginBottom: scaleSize(24),
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(12),
    },
    phoneInputStyle: {
      height: scaleSize(54),
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(12),
    },
    contactInfo: {
      flex: 1,
    },
    unsavedAndQr: { flexDirection: 'row', marginBottom: scaleSize(20) },
    unsaved: { flexDirection: 'row', flex: 1, gap: scaleSize(6), alignItems: 'center' },
    qr: { borderLeftWidth: 2, borderLeftColor: colors.primary.primary200, marginRight: scaleSize(16) },
    contactContainer: {
      marginTop: scaleSize(18),
      marginHorizontal: scaleSize(24),
    },
    contactList: { flex: 0, height: moderateScale(selectedContact ? 200 : 235, 10) },
    submitContact: {
      marginBottom: scaleSize(24),
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      backgroundColor: colors.transparent,
      overflow: 'hidden',
      padding: scaleSize(20),
      justifyContent: 'center',
      flex: 0.2,
      borderRadius: scaleSize(16),
      marginHorizontal: scaleSize(24),
      alignSelf: 'stretch',
    },
    checkmarkPoints: {
      backgroundColor: colors.backgrounds.greyOverlay,
      flexDirection: 'row',
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(18),
      paddingVertical: scaleSize(8),
      alignItems: 'center',
      gap: scaleSize(16),
      width: '100%',
      marginBottom: scaleSize(16),
    },
    submitSection: {
      width: scaleSize(270),
      height: scaleSize(270),
      borderRadius: SCALE_48,
      marginVertical: SCALE_16,
      marginHorizontal: SCALE_10,
    },
    contactCount: {
      flexDirection: 'row',
      marginBottom: scaleSize(16),
      gap: scaleSize(2),
    },
    selectedContactChip: {
      borderColor: colors.primary.primary500,
      borderWidth: 1,
      borderRadius: scaleSize(8),
    },
    selectedContactList: { gap: scaleSize(4) },
    contactChip: { flexDirection: 'row', alignItem: 'center', flex: 0.2, marginBottom: scaleSize(16) },
    unsavedBottomSheet: { width: '90%' },
    unsavedButton: {
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(14),
      height: scaleSize(50),
      marginTop: moderateScale(12),
    },
    arrow: {
      marginTop: scaleSize(4),
    },
    inputStyle: {
      marginVertical: verticalScale(-12),
    },
    topMargin: {
      top: verticalScale(4),
    },
  });

export default walletTransferStyles;
