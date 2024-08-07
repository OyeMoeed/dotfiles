import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const menuStyles = (theme: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    profileHeaderView: {
      height: verticalScale(85),
      borderRadius: moderateScale(28),
      marginTop: moderateScale(28),
      overflow: 'hidden',
    },
    profileView: {
      padding: moderateScale(18, 0.3),
      flexDirection: 'row',
      alignItems: 'center',
    },
    sheetBodyStyle: {
      bottom: verticalScale(100),
    },
    profileNameText: {
      marginBottom: moderateScale(4),
    },
    profileImage: {
      width: verticalScale(60),
      height: verticalScale(60),
      borderRadius: moderateScale(11.37),
      overflow: 'hidden',
    },
    profileTextView: {
      flex: 1,
      marginHorizontal: moderateScale(16, 0.3),
      justifyContent: 'center',
    },
    menuItemView: {
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: moderateScale(12, 0.3),
      borderRadius: moderateScale(16),
      height: verticalScale(50),
      backgroundColor: theme.natural.natural0,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateScale(16),
    },
    menuItemText: {
      flex: 1,
      marginStart: moderateScale(12),
    },
    separatorBar: {
      width: '100%',
      height: verticalScale(1),
      backgroundColor: theme.natural.natural300,
      marginVertical: moderateScale(28),
    },
    secondayItemView: {
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: moderateScale(12, 0.3),
      borderRadius: moderateScale(16),
      height: verticalScale(50),
      backgroundColor: theme.natural.natural5,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateScale(16),
    },
  });

export default menuStyles;
