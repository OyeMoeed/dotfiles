import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_16 } from '@app/styles/spacing.const';
import { FONT_WEIGHT_BOLD, FONT_WEIGHT_NORMAL } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const sectionStyles = (colors: any) =>
  createStyleSheet({
    container: {
      paddingTop: verticalScale(32),
      overflow: 'hidden',
    },
    latestOfferListContainer: {
      paddingLeft: moderateScale(24),
      gap: moderateScale(20),
    },
    adImage: {
      height: verticalScale(230),
      width: scaleSize(230),
      resizeMode: 'contain',
    },
    adSectionContainer: {
      gap: scaleSize(24),
      marginVertical: verticalScale(8),
      paddingLeft: moderateScale(24),
    },
    headingsContainer: {
      paddingHorizontal: moderateScale(24),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    commonContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footnoteTextStyle: {
      marginRight: moderateScale(8),
      color: colors.natural.natural500,
      fontWeight: FONT_WEIGHT_NORMAL,
      fontSize: scaleFont(13),
      lineHeight: verticalScale(18),
    },
    subheadingTextStyle: {
      marginRight: moderateScale(8),
      fontSize: scaleFont(15),
      color: colors.primary.primary600,
      lineHeight: verticalScale(20),
    },
    captionTextStyle: {
      fontWeight: FONT_WEIGHT_NORMAL,
      fontSize: scaleFont(11),
      color: colors.warning.warning500,
      lineHeight: verticalScale(13),
    },
    historyContStyle: {
      width: '100%',
      height: verticalScale(70),
      borderRadius: scaleSize(28),
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: moderateScale(16),
      paddingRight: moderateScale(24),
      marginVertical: verticalScale(4),
    },
    iconStyle: {
      width: scaleSize(34),
      height: verticalScale(34),
      borderRadius: scaleSize(12),
      backgroundColor: colors.natural.natural100,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: moderateScale(8),
    },
    currencyStyle: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    footnoteBoldTextStyle: {
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: scaleFont(13),
      color: colors.natural.natural900,
      lineHeight: verticalScale(18),
    },
    footnoteRedTextStyle: {
      color: colors.error.error500,
    },
    flatListStyle: {
      width: '100%',
    },
    suggestedStyle: {
      height: 'auto',
    },
    listContainer: {
      marginVertical: SCALE_16,
    },
    rearrangeContainerStyle: {
      justifyContent: 'center',
      marginBottom: verticalScale(40),
      marginTop: verticalScale(20),
    },
    captionStyleText: {
      color: colors.natural.natural900,
    },
    captionStyleTwoText: {
      color: colors.natural.natural500,
    },
    noRecordWrapper: {
      paddingVertical: verticalScale(50),
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(20),
      marginHorizontal: moderateScale(24),
      marginVertical: verticalScale(20),
    },
    bannerActionContainer: {
      paddingHorizontal: moderateScale(24),
    },
    suggestedContainerHeading: {
      paddingHorizontal: moderateScale(24),
    },
    lastItem: {
      marginRight: moderateScale(24),
    },
    offerContainerStyle: {
      marginVertical: verticalScale(16),
    },
    rearrangeIcon: {
      height: moderateScale(18),
      width: moderateScale(18),
    },
  });

export default sectionStyles;
