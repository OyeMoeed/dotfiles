import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const laborerInfoStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: { marginTop: moderateScale(18) },
    listStyle: {
      flex: 0,
    },
    containerHeadings: {
      color: theme.natural.natural500,
    },
    subHeadline: {
      color: theme.primary.primary800,
      marginStart: moderateScale(8, 0.3),
      textAlign: 'right',
    },
    personalInfoCardTitleText: {
      color: theme.natural.natural900,
      width: '40%',
      textAlign: 'left',
    },
    cardStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.natural.natural0,
      marginTop: scaleSize(10),
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(18),
      paddingVertical: scaleSize(12),
    },
    countryFlagImg: {
      width: verticalScale(18),
      height: verticalScale(18),
      marginLeft: scaleSize(10),
    },
    detailsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '60%',
    },
  });

export default laborerInfoStyles;
