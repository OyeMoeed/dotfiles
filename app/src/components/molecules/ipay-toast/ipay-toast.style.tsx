import colors from '@app/styles/colors.const';
import { SCREEN_WIDTH } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_1, SCALE_10, SCALE_12, SCALE_16, SCALE_18, SCALE_5, spacing } from '@app/styles/spacing.const';
import { moderateScale, scale } from 'react-native-size-matters';

const styles = ({ _, bgColor, titleColor, borderColor }) =>
  createStyleSheet({
    mainContiner: {
      backgroundColor: 'transparent'
    },
    constainer: {
      width: scale(SCREEN_WIDTH / 1.22),
      position: 'absolute',
      left: moderateScale(15),
      zIndex: 10000,
      overflow: 'hidden',
      borderRadius: SCALE_16,
      backgroundColor: bgColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SCALE_18,
      paddingVertical: SCALE_12,
      marginTop: SCALE_5,
      borderWidth: SCALE_1,
      borderColor: bgColor,
      shadowColor: colors.natural.natural700,
      shadowOffset: {
        height: -4,
        width: 0
      },
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 3
    },
    font: {
      fontSize: spacing.CUSTOME_SCALE(14)
      // color: colors.natural.natural0
    },
    commonContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    leftIconContainer: {
      marginRight: SCALE_10
    },
    rightIconContainerText: {
      marginLeft: SCALE_10
    },
    viewText: {
      color: titleColor
    },
    subTitleStyle: {
      fontSize: spacing.CUSTOME_SCALE(12)
      // color: colors.natural.natural0
    },
    rightIconContainer: {},
    toast: {},
    textView: { width: '80%' }
  });

export default styles;
