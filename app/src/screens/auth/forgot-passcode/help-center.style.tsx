import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const helpCenterStyles = (colors: any) =>
  createStyleSheet({
    safeAreaView: {
      flex: 1,
    },
    container: {
      flex: 1,
      marginTop: verticalScale(24),
      paddingHorizontal: scaleSize(16),
    },
    titleContainer: {
      alignItems: 'center',
      marginBottom: verticalScale(14),
    },
    title: {
      color: colors.primary.primary900,
      textAlign: 'center',
      marginTop: moderateScale(16),
      marginBottom: moderateScale(8),
    },
    subtitle: {
      color: colors.natural.natural700,
      marginBottom: scaleSize(16),
      textAlign: 'center',
    },
    faqItemContainer: {
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(16),
      marginBottom: scaleSize(8),
      overflow: 'hidden',
    },
    faqItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(16),
    },
    listView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    faqItemText: {
      color: colors.primary.primary800,
    },
    faqItemIcon: {
      color: colors.primary.primary800,
    },
    faqItemIconExpanded: {
      fontSize: scaleSize(18),
      color: colors.primary.primary800,
      transform: [{ rotate: '180deg' }],
    },
    faqItemAnswer: {
      paddingHorizontal: scaleSize(16),
      color: colors.natural.natural700,
    },
    faqItemAnswerFirstItem: {
      paddingTop: scaleSize(12),
    },
    faqItemAnswerLastItem: {
      paddingBottom: scaleSize(20),
    },
    faqItemAnswerListItem: {
      paddingVertical: scaleSize(3),
    },
    contactUsContainer: {
      marginTop: verticalScale(24),
      marginBottom: verticalScale(100),
      alignItems: 'center',
    },
    contactUsText: {
      marginBottom: scaleSize(5),
      color: colors.primary.primary900,
    },
    contactUsSubText: {
      color: colors.natural.natural700,
      marginBottom: scaleSize(16),
    },
    buttonText: {
      color: colors.tertiary.tertiary800,
    },
    buttonBg: {
      backgroundColor: colors.secondary.secondary100,
      width: scale(250),
    },
  });

export default helpCenterStyles;
