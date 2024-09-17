import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const freezeConfirmationSheetStyles = () =>
  createStyleSheet({
    actionSheetStyle: {
      bottom: verticalScale(80),
    },
    toast: {
      bottom: verticalScale(88),
      left: scaleFont(24),
      position: 'absolute',
      width: '90%',
    },
  });

export default freezeConfirmationSheetStyles;
