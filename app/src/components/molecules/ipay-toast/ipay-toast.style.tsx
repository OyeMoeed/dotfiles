import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_1, SCALE_10, SCALE_12, SCALE_16, SCALE_18, SCALE_5, spacing } from '@app/styles/spacing.const';
import { IPayToastProps } from './ipay-toast.interface';

const styles = ({
  bgColor = '#fff',
  titleColor = colors.primary.primary800,
  borderColor = colors.secondary.secondary200,
}: IPayToastProps) =>
  createStyleSheet({
    mainContiner: {
      backgroundColor: 'transparent',
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
      marginTop: SCALE_5,
      borderWidth: SCALE_1,
      borderColor,
      shadowColor: 'rgba(33, 37, 41, 0.08)',
      shadowOffset: {
        height: -4,
        width: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 3,
    },
    font: {
      fontSize: spacing.CUSTOME_SCALE(14),
      color: colors.natural.natural900,
    },
    commonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftIconContainer: {
      marginRight: SCALE_10,
    },
    rightIconContainer: {
      marginLeft: SCALE_10,
    },
    viewText: {
      color: titleColor,
    },
    subTitleStyle: {
      fontSize: spacing.CUSTOME_SCALE(12),
      color: colors.natural.natural500,
    },
  });

export default styles;
