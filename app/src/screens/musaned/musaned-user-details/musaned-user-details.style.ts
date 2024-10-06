import { moderateScale, verticalScale } from 'react-native-size-matters';

import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { scaleSize } from '@app/styles/mixins';

const musanedUserDetailsStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    contentContainer: {
      marginHorizontal: moderateScale(16),
    },
    containerHeadings: {
      color: theme.natural.natural500,
    },
    paymentInfoContainer: { marginTop: moderateScale(18) },
    footer: {
      marginBottom: moderateScale(30),
      marginHorizontal: moderateScale(16),
      marginTop: moderateScale(10),
    },
    paymentInfoCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.natural.natural0,
      marginTop: scaleSize(10),
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(18),
      paddingVertical: scaleSize(12),
    },
    statusView: {
      borderRadius: moderateScale(8),
    },
    statusText: {
      paddingVertical: moderateScale(2),
      paddingHorizontal: moderateScale(10),
    },
    profileIcon: {
      backgroundColor: theme.primary.primary10,
      padding: moderateScale(10),
      borderRadius: moderateScale(15),
      alignSelf: 'center',
    },
    headingsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: verticalScale(12),
      width: '100%',
    },
    commonContainerStyle: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    viewAllButtonStyle: {
      paddingEnd: 0,
    },
    footnoteTextStyle: {
      color: theme.natural.natural500,
    },
  });

export default musanedUserDetailsStyles;
