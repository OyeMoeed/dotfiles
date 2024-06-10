import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_48, spacing } from '@app/styles/spacing.const';
import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const bottonSheetStyles = (colors: any) =>
  StyleSheet.create({
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
      paddingVertical: moderateScale(8),
      borderTopRightRadius: spacing.SCALE_48,
      borderTopLeftRadius: spacing.SCALE_48
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
    },
    overlay: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      top: -spacing.CUSTOME_SCALE(65),
      left: -spacing.CUSTOME_SCALE(24)
    },
    bottomSheetContainerStyle: {
      height: '94%'
    },
    bottmModalStyle: {
      borderRadius: SCALE_48,
      backgroundColor: 'red',
      overflow: 'hidden'
    },
    logoContainer:{
      width:'100%',
      height:verticalScale(40),
      justifyContent:'center',
      alignItems:'center'
    },
    bottomSheetStyle:{
      overflow:'hidden'
    }
  });

export default bottonSheetStyles;