import { constants } from '@app/components/atoms/ipay-text/constants.text';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_13 } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const noResultStyles = () =>
  createStyleSheet({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageStyle: {
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      fontSize: FONT_SIZE_13,
      lineHeight: moderateScale(18),
      textAlign: 'center',
    },
    emptyRecordImage: {
      width: moderateScale(50),
      height: moderateScale(60),
      marginBottom: moderateScale(15),
    },
    iconWrapper: {
      marginRight: moderateScale(12),
    },
    displayInRowStyle: {
      flexDirection: 'row',
    },
    displayInRowImageStyle: {
      marginBottom: 0,
      marginRight: moderateScale(12),
    },
  });

export default noResultStyles;
