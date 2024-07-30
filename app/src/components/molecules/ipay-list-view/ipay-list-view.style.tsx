import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const listViewStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    listContainer: {
      marginHorizontal: moderateScale(16),
    },
    listImg: {
      height: verticalScale(24),
      width: scaleSize(24),
    },
  });

export default listViewStyles;
