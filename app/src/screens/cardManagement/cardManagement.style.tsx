import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const cardManagementStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingTop: scaleFont(16),
    },

    noResult: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    sendButton: {
      backgroundColor: colors.primary.primary500,
      marginTop: scaleSize(24),
      paddingHorizontal: scaleSize(26),
      paddingVertical: scaleSize(10),
      borderRadius: moderateScale(14),
    },
    emptyRecordImage: {
      marginBottom: moderateScale(15),
    },
  });

export default cardManagementStyles;
