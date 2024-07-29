import { constants } from '@app/components/atoms/ipay-text/constants.text';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_16 } from '@app/styles/spacing.const';
import { isIosOS } from '@app/utilities/constants';

import DeviceInfo from 'react-native-device-info';
import { verticalScale } from 'react-native-size-matters';

const sectionStyles = (colors: any) =>
  createStyleSheet({
    container: {
      paddingTop: scaleFont(32),
      overflow: 'hidden',
      paddingBottom: isIosOS ? scaleFont(64) : DeviceInfo.isTablet() ? scaleFont(120) : scaleFont(40),
    },
    latestOfferListContainer: {
      gap: scaleFont(20),
      paddingLeft: scaleFont(16),
    },
    adImage: {
      height: verticalScale(230),
      width: scaleSize(230),
      resizeMode: 'contain',
    },
    adSectionContainer: {
      gap: scaleSize(24),
      marginVertical: scaleSize(8),
      paddingLeft: scaleFont(24),
    },
    headingsContainer: {
      paddingHorizontal: scaleFont(24),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    commonContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    footnoteTextStyle: {
      marginRight: scaleFont(8),
      color: colors.natural.natural500,
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      fontSize: scaleFont(13),
      lineHeight: verticalScale(18),
    },
    subheadingTextStyle: {
      marginRight: scaleFont(8),
      fontSize: scaleFont(15),
      color: colors.primary.primary600,
      lineHeight: scaleFont(20),
    },
    captionTextStyle: {
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      fontSize: scaleFont(11),
      color: colors.warning.warning500,
      lineHeight: verticalScale(13),
    },
    historyContStyle: {
      width: '100%',
      height: verticalScale(70),
      borderRadius: scaleFont(28),
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: scaleFont(16),
      paddingRight: scaleFont(24),
      // paddingVertical: spacing.CUSTOME_SCALE(24),
      marginVertical: scaleFont(4),
    },
    iconStyle: {
      width: scaleSize(34),
      height: verticalScale(34),
      borderRadius: scaleFont(12),
      backgroundColor: colors.natural.natural100,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: scaleFont(8),
    },
    currencyStyle: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    footnoteBoldTextStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
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
      left: scaleFont(24),
      width: scaleSize(300),
      height: verticalScale(200),
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
      paddingVertical: scaleFont(50),
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleFont(20),
      marginHorizontal: scaleFont(24),
      marginVertical: scaleFont(20),
    },
    bannerActionContainer: {
      paddingHorizontal: scaleFont(24),
    },
    suggestedContainerHeading: {
      paddingHorizontal: scaleFont(24),
    },
    lastItem: {
      marginRight: scaleFont(24),
    },
    offerContainerStyle: {
      marginVertical: scaleSize(16),
    },
  });

export default sectionStyles;
