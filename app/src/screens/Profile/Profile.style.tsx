import colors from '@styles/colors';
import { FONT_WEIGHT_EXTRA_BOLD } from '@styles/typography';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  SafeAreaView1: { backgroundColor: colors.white, flex: 0 },
  SafeAreaView2: { flex: 1, backgroundColor: colors.white },
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white
  },
  buttonStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: 40,
    paddingVertical: 30,
    borderWidth: 0.5,
    borderColor: colors.gray94,
    borderRadius: 10
  },
  text: { fontSize: 18, color: colors.grey, fontWeight: FONT_WEIGHT_EXTRA_BOLD },
  profileText: { fontWeight: FONT_WEIGHT_EXTRA_BOLD, color: colors.white },
  footerView: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10
  },
  footerText: {
    color: colors.grey
  }
});

export default styles;
