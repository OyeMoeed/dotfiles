import { BottomBarPadding } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale } from 'react-native-size-matters';

const commonAlertSheet = () =>
  createStyleSheet({
    overridePortalSheetContainerStyle: {
      minHeight: 10,
      flex: undefined,
      alignItems: undefined,
    },
    container: {
      alignItems: 'center',
      paddingHorizontal: scale(24),
      paddingBottom: BottomBarPadding,
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
