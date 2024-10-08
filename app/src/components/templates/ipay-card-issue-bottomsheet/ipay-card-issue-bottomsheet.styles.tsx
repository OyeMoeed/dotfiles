import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const cardIssueStyle = (themeColors: typeof colors) =>
  createStyleSheet({
    margin: {
      paddingHorizontal: moderateScale(16),
    },
    headerRow: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    listStyle: {
      gap: moderateScale(8),
    },
    titleColor: {
      color: themeColors.primary.primary900,
      marginTop: moderateScale(8),
      marginBottom: moderateScale(18),
    },
    titleStyle: {
      color: themeColors.natural.natural900,
    },
    subTitleContainerStyle: {
      marginRight: moderateScale(16),
    },
    buttonContainer: {
      marginTop: moderateScale(24),
    },
    placeholder: {
      width: moderateScale(30),
      height: moderateScale(24),
    },
  });

export default cardIssueStyle;
