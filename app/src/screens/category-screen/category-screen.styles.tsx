import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const categoryScreenStyles = (theme: typeof colors) =>
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
      borderWidth: 0,
      justifyContent: 'center',
      width: moderateScale(300),
      height: moderateScale(40),
    },
    searchRow: {
      gap: moderateScale(12),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: { marginHorizontal: moderateScale(13, 0.2), marginBottom: moderateScale(8) },
    chipContainer: {
      width: '100%',
      justifyContent: 'center',
    },
  });

export default categoryScreenStyles;
