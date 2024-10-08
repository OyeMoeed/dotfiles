import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const idleTimerStyles = () =>
  createStyleSheet({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
    },
    button: {
      width: moderateScale(145, 0.5),
      marginTop: 32,
      marginHorizontal: 8,
    },
  });

export default idleTimerStyles;
