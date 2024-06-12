import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const profileScreenStyles = (theme: any) =>
  createStyleSheet({
    container: {
      flexGrow: 1,
      paddingTop: moderateScale(10),
      paddingHorizontal: moderateScale(10),
    },
    SafeAreaView1: { flex: 0 },
    SafeAreaView2: { flex: 1 },
    outerWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonStyle: {
      paddingHorizontal: moderateScale(40),
      paddingVertical: moderateScale(30),
      borderWidth: moderateScale(0.5),
      borderRadius: moderateScale(10),
    },
    text: { fontSize: scaleFont(18), color: theme.natural.natural300 },
    profileText: { color: theme.natural.natural0 },
    footerView: {
      alignContent: 'flex-end',
      alignItems: 'flex-end',
      padding: moderateScale(10),
    },
    footerText: {
      color: theme.natural.natural300,
    },
    outerComponent: {
      width: '90%',
      margin: scaleSize(12),
      gap: scaleSize(12),
    },
  });

export default profileScreenStyles;
