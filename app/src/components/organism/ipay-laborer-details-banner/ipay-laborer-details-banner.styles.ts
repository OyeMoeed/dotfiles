import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const laborerDetailsStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      backgroundColor: theme.natural.natural0,
      padding: moderateScale(16),
      flexDirection: 'row',
      borderRadius: moderateScale(12),
      gap: moderateScale(12),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailsBannerContainer: {
      borderRadius: moderateScale(20),
      marginHorizontal: moderateScale(16),
      marginTop: moderateScale(20),
      marginBottom: moderateScale(16),
    },
    iconBackground: {
      backgroundColor: theme.primary.primary10,
      padding: moderateScale(10),
      borderRadius: moderateScale(15),
      alignSelf: 'center',
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: moderateScale(4),
    },
    textContainer: {
      justifyContent: 'center',
    },
    logoIcon: {
      height: scaleSize(22.5),
      width: scaleSize(22.5),
    },
    statusView: {
      borderRadius: moderateScale(8),
    },
    listContainer: {
      alignSelf: 'center',
    },
    basicSalaryText: {
      fontSize: moderateScale(12),
      marginBottom: moderateScale(2),
    },
    basicSalaryAmount: {
      fontSize: moderateScale(16),
    },
    sarText: {
      fontSize: moderateScale(14),
    },
    laborerPosition: {
      fontSize: moderateScale(14),
      marginTop: moderateScale(4),
      textAlign: 'left',
    },
    titleStyle: {
      textAlign: 'left',
    },
  });

export default laborerDetailsStyles;
