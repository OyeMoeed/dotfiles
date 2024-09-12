import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12, SCALE_32 } from '@app/styles/spacing.const';
import { FONT_SIZE_10, fonts } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const topBarStyles = (colors: any) =>
  createStyleSheet({
    topNavCon: {},
    topNavConStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    handWaveText: {
      fontSize: FONT_SIZE_10,
      color: colors.natural.natural0,
    },
    imageStyle: {
      width: SCALE_32,
      height: SCALE_32,
      marginRight: moderateScale(8),
      borderRadius: moderateScale(12),
    },
    leftNavConStyle: {
      flexDirection: 'row',
    },
    buttonStyle: {
      paddingHorizontal: moderateScale(40),
      paddingVertical: moderateScale(30),
      borderWidth: moderateScale(0.5),
      padding: moderateScale(1),
      marginTop: moderateScale(10),
    },
    addGap: {
      gap: SCALE_12,
    },
    popTextStyle: {
      color: colors.primary.primary500,
    },
    listContainer: {
      width: '100%',
    },
    nameStyle: {
      fontSize: moderateScale(15),
      fontFamily: fonts.BOLD,
      textTransform: 'capitalize',
      color: colors.natural.natural900,
    },
    welcomeText: {
      color: colors.natural.natural900,
    },
    welcomeTextContainer: {
      flexDirection: 'row',
    },
  });

export default topBarStyles;
