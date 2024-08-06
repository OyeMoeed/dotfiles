import { constants } from '@app/components/atoms/ipay-text/constants.text';
import { scaleFont, scaleSize, SCREEN_HEIGHT, SCREEN_WIDTH } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const bottonSheetStyles = (colors?: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      padding: moderateScale(24),
      justifyContent: 'center',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    borderRadius: {
      borderTopRightRadius: scaleSize(28),
      borderTopLeftRadius: scaleSize(28),
    },
    backButtonStyle: {
      marginLeft: moderateScale(12),
    },
    headerContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: moderateScale(8),
    },
    boldStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
    },

    overlayFullWindowStyles: { position: 'absolute', width: SCREEN_WIDTH, height: '100%', bottom: 0 },
    headerBar: {
      width: scale(36),
      height: verticalScale(5),
      borderRadius: moderateScale(10),
    },
    simpleHeaderBar: {
      width: scale(36),
      height: verticalScale(5),
      borderRadius: moderateScale(10),
      backgroundColor: colors.natural.natural300,
      alignSelf: 'center',
    },
    headerTitlesView: {
      flex: 1,
      height: verticalScale(38),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    simpleHeaderTitleView: {
      width: '100%',
      height: verticalScale(38),
      justifyContent: 'center',
      alignItems: 'center',
    },
    simpleTitleText: {
      marginTop: scale(10),
    },
    titleText: {
      flex: 1,
      textAlign: 'center',
    },
    overlay: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
    cancelBtnView: {
      width: scale(90),
      alignItems: 'flex-start',
      marginTop: scaleFont(4),
    },
    doneBtnView: {
      width: scale(90),
      alignItems: 'flex-end',
    },
    fullWindowOverlay: { position: 'absolute', width: SCREEN_WIDTH, height: '100%', bottom: '0%' },
    overlayStyle: {
      zindex: 2000,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.backgrounds.backdrop,
    },
    backgroundStyle: {
      borderRadius: scaleSize(28),
    },
  });

export default bottonSheetStyles;
