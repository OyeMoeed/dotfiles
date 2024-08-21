import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export const genratedStyles = (colors: any) =>
  createStyleSheet({
    logoStyles: {
      width: verticalScale(84),
      height: verticalScale(28),
    },
    container: {
      flex: 1,
    },
    bottomSheetContainer: { flex: 1, width: '100%', height: moderateScale(500), marginHorizontal: moderateScale(24) },
    previewContainer: {
      backgroundColor: colors.backgrounds.skyBlue,
      borderRadius: moderateScale(12),
      alignItems: 'center',
      marginHorizontal: moderateScale(36),
      height: moderateScale(400),
      paddingTop: moderateScale(24),
    },
    image: { width: moderateScale(120), height: moderateScale(120) },
    amount: { flexDirection: 'row', alignItems: 'center', gap: moderateScale(2) },
    messagePreview: {
      marginHorizontal: moderateScale(12),
    },
    messagePreviewText: {
      textAlign: 'center',
      marginVertical: verticalScale(20),
    },
  });
