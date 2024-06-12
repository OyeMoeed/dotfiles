import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const bottonSheetStyles = (colors?: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      padding: moderateScale(24),
      justifyContent: 'center'
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.grey.greyOverlay
    },
    headerContainer: {
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateScale(8),
      borderTopRightRadius: spacing.SCALE_20,
      borderTopLeftRadius: spacing.SCALE_20,
      backgroundColor: colors.grey.greyOverlay
    },
    headerBar: {
      width: scale(36),
      height: verticalScale(5),
      borderRadius: moderateScale(10),
      alignSelf: 'center'
    },
    bottomSheetContainerStyle: {
      height: '94%'
    },

    simpleHeaderBar: {
      width: scale(36),
      height: verticalScale(5),
      borderRadius: moderateScale(10),
      backgroundColor: colors.natural.natural300,
      alignSelf: 'center'
    },
    headerTitlesView: {
      width: '100%',
      height: verticalScale(38),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch'
    },
    simpleHeaderTitleView: {
      width: '100%',
      height: verticalScale(38),
      justifyContent: 'center',
      alignItems: 'center'
    },
    simpleTitleText: {
      marginTop: scale(10)
    },
    titleText: {
      marginStart: scale(-10)
    },
    overlay: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      top: -spacing.CUSTOME_SCALE(65),
      left: -spacing.CUSTOME_SCALE(24)
    },
    fullWindowOverlay: {
      position: 'absolute',
      width: SCREEN_WIDTH,
      height: '100%',
      bottom: '-15%'
    }
  });

export default bottonSheetStyles;
