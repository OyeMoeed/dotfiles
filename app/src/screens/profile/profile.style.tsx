import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const profileStyles = (colors: any) =>
  createStyleSheet({
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: scaleSize(30),
    },
    SafeAreaView2: {
      flex: 1,
    },
    imageStyle: {
      width: scaleSize(18.5),
      height: scaleSize(18),
    },
    galaryImage: {
      height: moderateScale(18),
      width: moderateScale(18),
    },
    image: {
      width: scale(80),
      height: scale(80),
      borderRadius: moderateScale(28),
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.natural.natural0, // Background color for initials container
    },
    initialsText: {
      color: colors.primary.primary500,
    },
    overlayIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.primary.primary500,
      borderRadius: scaleSize(10),
      padding: scaleSize(5),
    },

    containerHeadings: {
      color: colors.natural.natural500,
    },
    textVerify: {
      color: colors.primary.primary500,
    },
    textComplete: {
      color: colors.natural.natural300,
    },
    headingStyles: {
      marginLeft: scaleSize(10),
      color: colors.natural.natural900,
    },
    personalInfoCardTitleText: {
      color: colors.natural.natural900,
    },

    body1: { marginHorizontal: moderateScale(24), marginVertical: verticalScale(32) },
    body2: { marginHorizontal: moderateScale(24) },
    cardStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
      marginTop: scaleSize(10),
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(18),
      paddingVertical: scaleSize(12),
    },
    cardText: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconStyle: {
      marginRight: scaleSize(10),
    },
    subHeadline: {
      color: colors.primary.primary800,
      marginStart: moderateScale(8, 0.3),
      width: scale(175),
      textAlign: 'right',
    },
    listStyle: {
      flex: 0,
    },
    addPhotoIcon: {
      paddingHorizontal: scaleSize(5),
      paddingVertical: scaleSize(2),
    },
    actionSheetBody: {
      bottom: isIosOS ? '27%' : '18%',
    },
    containerToastStyle: {
      borderColor: colors.success.success500,
      backgroundColor: colors.success.success500,
    },
  });

export default profileStyles;
