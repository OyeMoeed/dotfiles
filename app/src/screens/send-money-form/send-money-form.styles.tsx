import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const sendMoneyFormStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    history: { flexDirection: 'row', flex: 1, gap: scaleSize(6), alignItems: 'center' },

    contactInfoContainer: {
      flexDirection: 'row',
      gap: moderateScale(2),
      marginTop: moderateScale(10),
    },
    inncerContainer: {
      marginTop: moderateScale(22),
      marginHorizontal: moderateScale(24, 0.2),
      flex: 1,
    },
    listContainer: {
      marginHorizontal: moderateScale(16),
    },
    buttonBackground: {
      flex: 0,
      backgroundColor: theme.appGradient.buttonBackground,
      borderRadius: moderateScale(24),
      padding: moderateScale(16),
      gap: moderateScale(8),
      marginBottom: moderateScale(10),
    },
    alert: {
      marginBottom: moderateScale(32),
    },
  });

export default sendMoneyFormStyles;
