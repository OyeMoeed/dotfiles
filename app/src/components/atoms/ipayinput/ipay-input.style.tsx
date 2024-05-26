
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const inputStyles = (colors: any) =>
  createStyleSheet({
    container: {
      height: scaleSize(56),
      borderRadius: scaleSize(22),
      borderWidth: 1,
      borderColor: colors.primary.primary100,
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    },
    label: {
      color: colors.primary.primary600,
    },
    iconAndInputStyles: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleSize(8),
    },
    textInputStyle: {
      color: colors.natural.natural900,
    },
    outerView: {
      flex: 1,
    },
    disabledContainer: {
      backgroundColor: colors.natural.natural200,
      borderColor: colors.natural.natural200
    },
    outerWrapper: {
      gap: scaleSize(8),
    },
    disableLabel: {
      color: colors.natural.natural500
    },
    errorAssistiveTextText: {
      color: colors.red500
    },
    assistiveText: {
       color: colors.natural.natural500
    },
    closeIcon: {
      backgroundColor: 'transparent',
      paddingVertical: scaleSize(10),
      paddingLeft: scaleSize(10),

    }
  });

export default inputStyles;
