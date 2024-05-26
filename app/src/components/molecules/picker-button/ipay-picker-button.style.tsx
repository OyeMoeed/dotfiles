import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
const pickerStyles = (colors: any) =>
  createStyleSheet({
    activeButtonText: {
      color: colors.natural.natural500
    },
    segment: {
      borderColor: colors.primary.primary100,
      flexDirection: 'row',
      borderWidth: scaleSize(1),
      padding: scaleSize(2),
      borderRadius: scaleSize(12)
    },
    rowStyles: {
      flexDirection: 'row',
      gap: scaleSize(6)
    },
    variantContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: scaleSize(12),
      paddingVertical: scaleSize(8),
      paddingHorizontal: scaleSize(12),
      alignSelf: 'flex-start',
      backgroundColor: colors.primary.primary50,
      justifyContent: 'space-between'
    },
    timeButton: {
      paddingHorizontal: scaleSize(12),
      borderRadius: scaleSize(18),
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    activeButton: {
      backgroundColor: colors.primary.primary500
    },
    buttonText: {
      color: colors.natural.natural0,
      fontWeight: 'bold'
    },
    timeText: {
      color: colors.primary.primary600
    }
  });
export default pickerStyles;
