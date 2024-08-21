import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isTablet } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const transactionDetailsCompStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(16, 0.3),
      marginBottom: isTablet ? moderateScale(35) : moderateScale(85),
      marginTop: moderateScale(8),
      overflow: 'hidden',
    },
    containerContiditional: {
      marginBottom: isTablet ? moderateScale(45) : moderateScale(90),
    },
    listView: {
      flex: 1,
      marginBottom: moderateScale(12),
    },
    footerView: {
      height: verticalScale(80),
    },
    buttonsView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnStyles: {
      width: '48%',
      height: verticalScale(34),
      paddingVertical: verticalScale(7),
    },
    shareBtn: {
      height: verticalScale(34),
      paddingVertical: verticalScale(7),
    },
    vatBtn: {
      marginTop: moderateScale(12),
      height: verticalScale(34),
      paddingVertical: verticalScale(7),
    },
  });

export default transactionDetailsCompStyles;
