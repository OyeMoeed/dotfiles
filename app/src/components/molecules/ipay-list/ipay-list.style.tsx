import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_10, SCALE_12, SCALE_16, SCALE_18, SCALE_32, SCALE_8, spacing } from '@app/styles/spacing.const';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { IPayListProps } from './ipay-list.interface';

const styles = ({ bgColor = '#fff' }: IPayListProps) =>
  createStyleSheet({
    mainContiner: {
      backgroundColor: 'transparent',
    },
    constainer: {
     minWidth:'100%',
      minHeight: spacing.CUSTOME_SCALE(48),
      width: 'auto',
      height: 'auto',
      borderRadius: SCALE_16,
      backgroundColor: bgColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SCALE_18,
      paddingVertical: SCALE_12,
      marginTop: scale(5),
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
    btnStyle: {
      minWidth: spacing.CUSTOME_SCALE(74),
      minHeight: SCALE_32,
      width: 'auto',
      backgroundColor: colors.greenPalette.green25,
      borderRadius: SCALE_12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnTextStyle: {
      fontSize: spacing.CUSTOME_SCALE(15),
      color: colors.tertiary.tertiary600,
    },
    btnTimeContainer: {
      minWidth: spacing.CUSTOME_SCALE(87),
      backgroundColor: colors.primary.primary50,
      marginLeft: SCALE_8,
    },
    btnTimeTextStyle: {
      color: colors.primary.primary600,
    },
    detailTextStyle: {
      color: colors.primary.primary800,
    },
    subTitleStyle: {
      fontSize: spacing.CUSTOME_SCALE(12),
      color: colors.natural.natural500,
    },
    sveBtnStyle:{
      width:moderateScale(86),
      height:moderateScale(34),
      backgroundColor:colors.secondary.secondary100,
      marginTop:verticalScale(8)
    },
    saveTextStyle:{
      color:colors.secondary.secondary900
    }
  
  });

export default styles;
