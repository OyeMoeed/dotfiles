import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const bottonSheetStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      padding: moderateScale(24),
      justifyContent: 'center'
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center'
    },
    headerContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateScale(8)
    },
    headerBar: {
      width: scale(36),
      height: verticalScale(5),
      borderRadius: moderateScale(10)
    },

    simpleHeaderBar: {
      width: scale(36),
      height: verticalScale(5),
      borderRadius: moderateScale(10),
      backgroundColor: colors.natural.natural300
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
    }
  });

export default bottonSheetStyles;
