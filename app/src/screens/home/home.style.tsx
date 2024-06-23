import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12, SCALE_16, SCALE_32, SCALE_48, SCALE_8, spacing } from '@app/styles/spacing.const';
import { moderateScale } from 'react-native-size-matters';

const homeStyles = (theme: any) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    topNavCon: {
      marginTop: SCALE_16,
      marginHorizontal: moderateScale(24),
    },
    balanceCon: {
      marginTop: SCALE_16,
      marginHorizontal: moderateScale(24),
    },
    topNavConStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageStyle: {
      width: SCALE_32,
      height: SCALE_32,
      marginRight: SCALE_8,
    },
    leftNavConStyle: {
      flexDirection: 'row',
    },
    buttonStyle: {
      paddingHorizontal: moderateScale(40),
      paddingVertical: moderateScale(30),
      borderWidth: moderateScale(0.5),

      borderRadius: moderateScale(10),
    },
    ListView: {
      borderBottomWidth: moderateScale(1),

      padding: moderateScale(1),
      marginTop: moderateScale(10),
    },
    addGap: {
      gap: SCALE_12,
    },
    popTextStyle: {
      color: theme.primary.primary500,
    },
    listContainer: {
      width: '100%',
    },
    nameStyle: {
      fontSize: spacing.CUSTOME_SCALE(15),
      fontWeight: '700',
      textTransform: 'capitalize',
    },
    bottomSheetContainerStyle: {
      backgroundColor: theme.backgrounds.greyOverlay,
      borderTopStartRadius: SCALE_48,
      borderTopEndRadius: SCALE_48,
      overflow: 'hidden',
    },
  });

export default homeStyles;
