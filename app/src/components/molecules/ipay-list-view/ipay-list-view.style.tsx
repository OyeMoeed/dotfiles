import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const listViewStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    listContainer: {
      marginHorizontal: moderateScale(16),
    },
  });

export default listViewStyles;
