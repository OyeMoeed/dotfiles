import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const dynamicFormoStyles = () =>
  createStyleSheet({
    dynamicFieldContainer: {
      flex: 1,
    },
    dynamicFieldRenderer: {
      marginBottom: verticalScale(5),
    },
  });

export default dynamicFormoStyles;
