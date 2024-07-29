import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const playStationStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      marginTop: moderateScale(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: moderateScale(13, 0.2),
      gap: moderateScale(15),
    },
    background: {
      backgroundColor: theme.natural.natural0,
      justifyContent: 'center',
      width: moderateScale(300),
    },
    searchRow: {
      gap: moderateScale(12),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default playStationStyles;
