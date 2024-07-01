import { constants } from '@app/components/atoms/ipay-text/constants.text';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import {
  CUSTOME_SCALE,
  SCALE_12,
  SCALE_15,
  SCALE_16,
  SCALE_20,
  SCALE_28,
  SCALE_32,
  SCALE_34,
  SCALE_4,
  SCALE_8,
  spacing,
} from '@app/styles/spacing.const';

import { FONT_SIZE_11, FONT_SIZE_13 } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const sectionStyles = (colors: any) =>
  createStyleSheet({
    container: {
      paddingHorizontal: SCALE_20,
      paddingTop: SCALE_32,
      overflow: 'hidden',
    },
    latestOfferListContainer: {
      gap: scaleSize(20),
    },
    adImage: {
      height: CUSTOME_SCALE(230),
      width: CUSTOME_SCALE(230),
    },
    adSectionContainer: {
      gap: scaleSize(24),
      marginTop: scaleSize(16),
      marginBottom: scaleSize(32),
    },
    headingsContainer: {
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
      marginRight: SCALE_8,
      color: colors.natural.natural500,
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      fontSize: FONT_SIZE_13,
      lineHeight: verticalScale(18),
    },
    subheadingTextStyle: {
      marginRight: SCALE_8,
      fontSize: SCALE_15,
      color: colors.primary.primary600,
      lineHeight: verticalScale(20),
    },
    captionTextStyle: {
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      fontSize: FONT_SIZE_11,
      color: colors.warning.warning500,
      lineHeight: verticalScale(13),
    },
    historyContStyle: {
      width: '100%',
      height: moderateScale(70, 0.3),
      borderRadius: SCALE_28,
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: spacing.CUSTOME_SCALE(16),
      paddingRight: spacing.CUSTOME_SCALE(24),
      // paddingVertical: spacing.CUSTOME_SCALE(24),
      marginVertical: SCALE_4,
    },
    iconStyle: {
      width: SCALE_34,
      height: SCALE_34,
      borderRadius: SCALE_12,
      backgroundColor: colors.natural.natural100,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SCALE_8,
    },
    currencyStyle: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    footnoteBoldTextStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_13,
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
      width: scale(300),
      height: verticalScale(200),
    },
    rearrangeContainerStyle: {
      justifyContent: 'center',
      marginBottom: SCALE_12,
    },
    captionStyleText: {
      color: colors.natural.natural900,
    },
    captionStyleTwoText: {
      color: colors.natural.natural500,
    },
    noRecordWrapper: {
      paddingVertical: moderateScale(50),
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(20),
    },
  });

export default sectionStyles;
