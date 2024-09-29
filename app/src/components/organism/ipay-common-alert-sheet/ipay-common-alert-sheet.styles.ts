import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const commonAlertSheet = () =>
  createStyleSheet({
    container: {
      alignItems: 'center',
      paddingHorizontal: 24,
      marginBottom: 16,
      flex: 1,
    },
    mainText: {
      marginTop: 16,
      marginBottom: 10,
    },
    subTitleText: { fontSize: 14, textAlign: 'center' },
    button: {
      width: moderateScale(345, 0.5),
      marginTop: 32,
    },
  });

export default commonAlertSheet;
