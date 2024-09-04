import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_17 } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const walletTransferStyles = (themeColors: typeof colors, selectedContact: boolean) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    history: { flexDirection: 'row', flex: 1, gap: scaleSize(6), alignItems: 'center', justifyContent: 'flex-end' },
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
      marginBottom: scaleSize(12),
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
    contactList: { flex: 0, height: moderateScale(selectedContact ? 200 : 235, 10) },
    submitContact: {
      marginBottom: scaleSize(24),
      overflow: 'hidden',
      paddingHorizontal: scaleSize(16),
      backgroundColor: colors.appGradient.buttonBackground,
      paddingVertical: moderateScale(16),
      justifyContent: 'center',
      flex: selectedContact ? 0.2 : 0,
      borderRadius: scaleSize(28),
      marginHorizontal: scaleSize(24),
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
    itemInfo: {
      justifyContent: 'center',
    },

    text: {
      color: colors.natural.natural900,
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
    selectedContactList: { gap: scaleSize(4) },
    contactChip: { flexDirection: 'row', alignItems: 'center', flex: 0, marginBottom: scaleSize(16) },
    unsavedBottomSheet: { width: '86%' },
    unsavedButton: {
      borderRadius: moderateScale(16),
      justifyContent: 'center',
      marginTop: moderateScale(12),
    },
    arrow: {},
    inputStyle: {
      fontSize: FONT_SIZE_17,
      paddingBottom: moderateScale(5),
    },
    topMargin: {
      top: verticalScale(4),
    },
    emptyItemStyle: { height: moderateScale(selectedContact ? 200 : 130) },
  });

export default walletTransferStyles;
