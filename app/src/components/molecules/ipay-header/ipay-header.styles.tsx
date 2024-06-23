import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { verticalScale } from 'react-native-size-matters';

const headerStyles = (colors: any) =>
  createStyleSheet({
    black: {
      color: colors.natural.natural1000
    },
    headerContainer: {
      marginTop: verticalScale(8),
      heigt: spacing.SCALE_28,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaleSize(24)
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: scaleSize(4)
    },
    title: {
      color: colors.primary.primary900,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    flexStyles: {
      justifyContent: 'center',
      alignContent: 'center'
    },
    rightStyles: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: scaleSize(4)
    },
    back: {
      color: colors.primary.primary500
    },
    flexOne: {
      flex: 1
    },
    flexTwo: {
      flex: 2
    }
  });

export default headerStyles;
