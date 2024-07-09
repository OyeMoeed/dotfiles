import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const dropdownViewStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: moderateScale(20, 0.3),
      width: '100%',
      height: verticalScale(54),
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
    },
    headingText: {
      marginBottom: verticalScale(2),
      color: colors.primary.primary500,
    },
  });

export default dropdownViewStyles;
