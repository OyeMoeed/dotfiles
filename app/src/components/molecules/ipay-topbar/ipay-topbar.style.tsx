import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12, SCALE_32 } from '@app/styles/spacing.const';
import { FONT_SIZE_11 } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const topBarStyles = (theme: any) =>
  createStyleSheet({
    topNavConStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: moderateScale(24)
    },
    imageStyle: {
      width: SCALE_32,
      height: SCALE_32,
      marginRight: moderateScale(8),
      borderRadius: moderateScale(12)
    },
    leftNavConStyle: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    buttonStyle: {
      paddingHorizontal: moderateScale(40),
      paddingVertical: moderateScale(30),
      borderWidth: moderateScale(0.5),

      borderRadius: moderateScale(10)
    },
    ListView: {
      borderBottomWidth: moderateScale(1),

      padding: moderateScale(1),
      marginTop: moderateScale(10)
    },
    addGap: {
      gap: SCALE_12
    },
    popTextStyle: {
      color: theme.primary.primary500
    },
    listContainer: {
      width: '100%'
    },
    nameStyle: {
      fontWeight: '700',
      textTransform: 'capitalize',
      lineHeight: verticalScale(20),
      color: theme.natural.natural900
    },
    captionTextStyle: {
      fontSize: FONT_SIZE_11,
      fontWeight: '400',
      color: theme.natural.natural900,
      textAlign: 'center',
      lineHeight: verticalScale(13)
    }
  });

export default topBarStyles;
