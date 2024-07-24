import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const gradientListStyle = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flexDirection: 'row',
      paddingHorizontal: scaleFont(18),
      paddingVertical: scaleFont(12),
      marginTop: scaleFont(16),
      flex: 0,
      borderRadius: scaleFont(22),
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleFont(16),
    },
    titleStyle: {
      color: themeColors.natural.natural900,
    },
    subTitleStyle: {
      color: themeColors.natural.natural500,
    },
  });

export default gradientListStyle;
