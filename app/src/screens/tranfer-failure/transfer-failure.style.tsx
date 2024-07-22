import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const transferFailureStyles = () =>
  createStyleSheet({
    innerLinearGradientView: {
      width: '100%',
      borderRadius: moderateScale(48),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: scaleSize(20),
      paddingTop: moderateScale(40),
      paddingBottom: scaleSize(20),
      paddingHorizontal: moderateScale(20, 0.3),
    },
    footerView: {
      width: '100%',
    },
    linkBtn: {
      marginTop: moderateScale(16),
    },
  });

export default transferFailureStyles;
