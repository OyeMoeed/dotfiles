import colors from "@app/styles/colors.const";
import createStyleSheet from "@app/styles/scaled-sheet.styles";
import { moderateScale } from "react-native-size-matters";

const sectionHeaderStyles = createStyleSheet({
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      fontSize: moderateScale(13),
      marginRight: moderateScale(8),
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(6),
    },
    dotView: {
      width: moderateScale(5),
      height: moderateScale(5),
      borderRadius: moderateScale(4),
      backgroundColor: colors.primary.primary500,
      marginRight: moderateScale(8),
    },
  });
  
  export default sectionHeaderStyles