import { StyleSheet } from 'react-native';
import { IPayToastProps } from './ipay-toast.interface';
import colors from '@app/styles/colors.styles';
import { SCALE_1, SCALE_10, SCALE_12, SCALE_14, SCALE_16, SCALE_18 } from '@app/styles/spacing.styles';

const styles = ({
  bgColor = '#fff',
  titleColor = colors.primary.primary800,
  borderColor = colors.secondary.secondary200
}: IPayToastProps) =>
  StyleSheet.create({
    mainContiner: {
      backgroundColor: 'transparent'
    },
    constainer: {
      minWidth: 361,
      minHeight: 48,
      width: 'auto',
      height: 'auto',
      borderRadius: SCALE_16,
      backgroundColor: bgColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SCALE_18,
      paddingVertical: SCALE_12,
      marginTop: 5,
      borderWidth: SCALE_1,
      borderColor: borderColor,
      shadowColor: 'rgba(33, 37, 41, 0.08)',
      shadowOffset: {
        height: -4,
        width: 0
      },
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 3
    },
    font: {
      fontSize: SCALE_14,
      color: colors.natural.natural900
    },
    commonContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    leftIconContainer: {
      marginRight: SCALE_10
    },
    rightIconContainer: {
        marginLeft: SCALE_10
      },
    viewText: {
      color: titleColor
    },
    subTitleStyle: {
      fontSize: SCALE_12,
      color: colors.natural.natural500
    }
  });

export default styles;
