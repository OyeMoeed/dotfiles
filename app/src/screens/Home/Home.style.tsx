import { SCALE_12 } from '@app/styles/spacing';
import colors from '@styles/colors';
import { FONT_WEIGHT_EXTRA_BOLD } from '@styles/typography';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor:colors.primary.primary10
  },
  SafeAreaView1: { backgroundColor: colors.white, flex: 0 },
  SafeAreaView2: { flex: 1, backgroundColor: colors.primary.primary10 },
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.primary10
  },
  buttonStyle: {
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 40,
    paddingVertical: 30,
    borderWidth: 0.5,
    borderColor: colors.gray94,
    borderRadius: 10
  },
  text: { fontSize: 16, color: colors.white, fontWeight: FONT_WEIGHT_EXTRA_BOLD },
  ListView: {
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    padding: 1,
    marginTop: 10
  },
  addGap: {
    gap: SCALE_12
  },
  popTextStyle:{
    color:colors.primary.primary500
  }
});

export default styles;
