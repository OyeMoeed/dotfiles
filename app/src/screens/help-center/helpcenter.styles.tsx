import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const helpCenterStyles = (colors: any) =>
  createStyleSheet({
    safeAreaView: {
      flex: 1,
    },
    container: {
      flex: 1,
      marginTop: scaleSize(10),
      paddingHorizontal: scaleSize(16),
      paddingVertical: scaleSize(24),
    },
    titleContainer: {
      alignItems: 'center',
      marginBottom: scaleSize(16),
    },
    title: {
      color: colors.primary.primary900,
      textAlign: 'center',
      marginTop: verticalScale(10)
    },
    subtitle: {
      color: colors.natural.natural700,
      marginBottom: scaleSize(16),
      textAlign: 'center',
    },
    faqItemContainer: {
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(8),
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
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(16),
      color: colors.natural.natural700,
    },
    contactUsContainer: {
      marginTop: scaleSize(32),
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
    buttonBg: {
      backgroundColor: colors.secondary.secondary100,
      paddingHorizontal: scaleSize(50),
      paddingVertical: scaleSize(14),
      borderRadius: scaleSize(30),
    },
  });

export default helpCenterStyles;
