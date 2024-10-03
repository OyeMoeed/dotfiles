import type { Colors } from '@app/styles/colors.const';
import { BottomBarPadding } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = (colors: Colors) =>
  createStyleSheet({
    iconAndTitleContainer: {
      marginBottom: verticalScale(16),
      backgroundColor: colors.error.error25,
      borderRadius: scale(40),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: scale(8),
      paddingVertical: scale(12),
      paddingHorizontal: scale(20),
      alignSelf: 'center',
      minWidth: scale(180),
    },
    topRightIconContainer: {
      position: 'absolute',
      width: scale(35),
      height: scale(35),
      justifyContent: 'center',
      alignItems: 'center',
      top: -scale(24) / 2.5,
      right: -scale(24) / 2.5,
      zIndex: 1,
      backgroundColor: colors.backgrounds.greyOverlay,
      borderRadius: scale(35) / 2,
    },
    commonTextStyle: {
      textAlign: 'center',
    },
    descriptionText: {
      marginTop: verticalScale(8),
      marginBottom: verticalScale(40),
    },
    sheetContainer: {
      paddingHorizontal: scale(24),
      paddingBottom: BottomBarPadding,
    },
    bottomSheetView: {
      flex: undefined,
      alignItems: undefined,
      minHeight: 10,
    },
  });

export default styles;
