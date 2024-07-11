import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const componentHeaderStyles = (colors: any) =>
  createStyleSheet({
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scaleSize(16),
      justifyContent: 'space-between',
    },
    textContainer: {
      flex: 1,
      marginLeft: scaleSize(8),
    },
    headerText: {
      color: colors.primary.primary900,
    },
    subtitleText: {
      marginTop: scaleSize(4),
    },
    cardIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
    },
    icon: {
      marginLeft: scaleSize(8),
    },
    imageStyles: { width: scaleSize(28), height: scaleSize(20) },
  });

export default componentHeaderStyles;
