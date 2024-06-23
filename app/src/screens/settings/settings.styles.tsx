import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const settingStyles = (colors: any) =>
  createStyleSheet({
    containerStyle: {
      paddingTop: scaleSize(10),
    },
    cardStyle: {  
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
      marginHorizontal: scaleSize(10),
      marginVertical: scaleSize(5),
      borderRadius: scaleSize(16),
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(18),
  
    },
    marginTop:{
      marginTop: scaleSize(22),
    },
    flagStyle: {
      marginLeft: scaleSize(10),
    },
    cardText: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconStyle: {
      width: 24,
      height: 24,
    },
    sectionHeader: {
      paddingVertical: scaleSize(10),
      paddingHorizontal: scaleSize(15),
      color: colors.natural.natural500,
    },
    captionText: {
      color: colors.natural.natural500,
    },
    toast: {
      position: 'absolute',
      bottom: scaleSize(20),
      left: scaleSize(15),
      right: scaleSize(20),
      zIndex: 1000,
      color: colors.natural.natural0,
    },
    toastText: {
      color: colors.natural.natural0,
    },
  });
export default settingStyles;
