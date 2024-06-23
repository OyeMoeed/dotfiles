import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const profileStyles = (colors: any) =>
  createStyleSheet({
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: scaleSize(30)
    },
    SafeAreaView2: {
      flex: 1
    },
    imageStyle: {
      width: scaleSize(18),
      height: scaleSize(18)
    },
    image: {
      width: scaleSize(80),
      height: scaleSize(80),
      borderRadius: scaleSize(28),
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.natural.natural0 // Background color for initials container
    },
    initialsText: {
      color: colors.primary.primary500
    },
    overlayIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.primary.primary500,
      borderRadius: scaleSize(10),
      padding: scaleSize(5)
    },

    containerHeadings: {
      color: colors.natural.natural500
    },
    textVerify: {
      color: colors.primary.primary500
    },
    textComplete: {
      color: colors.natural.natural300
    },
    headingStyles: {
      marginLeft: scaleSize(10),
      fontSize: scaleSize(11)
    },

    body1: { margin: scaleSize(20) },
    cardStyle: {
      flexDirection: 'row',
      width: scaleSize(311),
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
      marginTop: scaleSize(10),
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(18),
      paddingVertical: scaleSize(12)
    },
    cardText: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    iconStyle: {
      marginRight: scaleSize(10)
    },
    subHeadline: {
      color: colors.primary.primary800,
      fontSize: scaleSize(13)
    },
    listStyle: {
      flex: 0
    },
    addPhotoIcon: {
      paddingHorizontal: scaleSize(5),
      paddingVertical: scaleSize(2)
    }
  });

export default profileStyles;
