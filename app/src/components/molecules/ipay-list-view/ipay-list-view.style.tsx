import { scaleFont, scaleSize } from '@app/styles/mixins';
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
    noRecordContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: scaleFont(100),
    },
    noRecordWrapper: {
      gap: scaleFont(12),
      width: scaleSize(150),
    },
  });

export default listViewStyles;
