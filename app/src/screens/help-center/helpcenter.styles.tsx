import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const helpCenterStyles = (colors: any) =>
  createStyleSheet({
    safeAreaView: {
      flex: 1,
      paddingBottom: moderateScale(20, 0.3),
    },
    container: {
      flex: 1,
      marginTop: scaleSize(10),
      paddingHorizontal: moderateScale(24, 0.3),
    },
    titleContainer: {
      alignItems: 'center',
      marginBottom: scaleSize(16),
      marginVertical: verticalScale(16),
    },
    title: {
      color: colors.primary.primary900,
      textAlign: 'center',
      marginTop: verticalScale(10),
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
      width: '90%',
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
      // paddingVertical: scaleSize(12),
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
      borderRadius: scaleSize(16),
      marginBottom: verticalScale(50),
      width: moderateScale(300),
    },
    headerTabView: {
      height: verticalScale(30),
      marginBottom: verticalScale(16),
    },
    headerTabSelected: {
      height: verticalScale(28),
      borderRadius: moderateScale(8),
      backgroundColor: colors.primary.primary500,
      paddingHorizontal: moderateScale(12, 0.3),
      justifyContent: 'center',
    },
    headerTabUnSelected: {
      height: verticalScale(28),
      borderRadius: moderateScale(8),
      backgroundColor: colors.natural.natural0,
      paddingHorizontal: moderateScale(12, 0.3),
      justifyContent: 'center',
    },
    itemSeparator: {
      width: scale(8),
    },
    searchBarView: {
      flexDirection: 'row',
      alignItems: 'center',
      height: verticalScale(35),
      overflow: 'hidden',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(12),
      paddingHorizontal: moderateScale(12, 0.3),
    },
    searchInputText: {
      flex: 1,
      paddingHorizontal: moderateScale(12, 0.3),
    },
    header: {
      marginTop: moderateScale(24),
      marginBottom: moderateScale(16),
    },
    contactWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerStyle: {
      fontSize: moderateScale(15),
      lineHeight: moderateScale(20),
    },
    contentContainer: {
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(24),
      gap: moderateScale(5),
    },
    iconWrapper: {
      backgroundColor: colors.primary.primary500,
      justifyContent: 'center',
      alignItems: 'center',
      width: scaleSize(46),
      height: scaleSize(34),
      borderRadius: 15,
    },
    bodyStyle: {
      bottom: verticalScale(16),
    },
  });

export default helpCenterStyles;
