import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const styles = createStyleSheet({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  SafeAreaView1: { flex: 0 },
  SafeAreaView2: { flex: 1 },
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    paddingHorizontal: 40,
    paddingVertical: 30,
    borderWidth: 0.5,

    borderRadius: 10,
  },
  text: { fontSize: 18, color: colors.grey },
  profileText: { color: colors.white },
  footerView: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  footerText: {
    color: colors.grey,
  },
  outerComponent: {
    width: '90%',
    margin: scaleSize(12),
    gap: scaleSize(12),
  },
});

export default styles;
