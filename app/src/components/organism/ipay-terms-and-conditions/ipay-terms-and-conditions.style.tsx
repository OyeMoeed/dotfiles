import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const termsAndConditionsStyles = (theme: any) =>
  createStyleSheet({
    termsAndConditions: {
      marginTop: moderateScale(10),
      paddingVertical: moderateScale(10),
      marginHorizontal: moderateScale(33, 0.3),
    },
    termsAndConditionsHeading: {
      marginBottom: moderateScale(18),
    },
    termsAndConditionsText: {
      marginBottom: moderateScale(200),
    },
  });

export default termsAndConditionsStyles;
