import { useCallback, useEffect, useRef } from 'react';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { IPayCaption1Text, IPayIcon, IPaySubHeadlineText, IPayTitle2Text, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { scale } from 'react-native-size-matters';
import icons from '@app/assets/icons';
import { goBack } from '@app/navigation/navigation-service.navigation';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import { hideDisabledModules } from '@app/store/slices/disabled-module-slice';
import IPayDisabledModulesSheetStyle from './ipay-disabled-modules-sheet.style';
import IPayPrimaryButton from '../ipay-primary-button/ipay-primary-button.components';

const IPayDisabledModulesSheet = () => {
  const { icon, title, visible } = useTypedSelector((state) => state.disabledModulesReducer);
  const ref = useRef<BottomSheetModal>(null);
  const { colors } = useTheme();
  const styles = IPayDisabledModulesSheetStyle(colors);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (visible) {
        ref?.current?.present();
      } else {
        ref?.current?.close();
      }
    }, 100);
  }, [visible]);

  const onClose = useCallback(() => {
    dispatch(hideDisabledModules());
    goBack();
  }, [dispatch]);

  return (
    <IPayPortalBottomSheet
      ref={ref}
      simpleBar
      heading="DISABLED_MODULES.TITLE"
      onCloseBottomSheet={() => {}}
      isVisible
      overrideContainerStyle={styles.bottomSheetView}
      bold
      closeBottomSheetOnDone={false}
      isPanningGesture={false}
      enableDynamicSizing
      enableOverDrag={false}
      enablePanDownToClose={false}
      stopCloseBackgroundPress
      defaultIndex={-1}
    >
      <IPayView style={styles.sheetContainer}>
        <IPayView style={styles.iconAndTitleContainer}>
          <IPayIcon icon={icon} color={colors.error.error500} size={scale(36)} />
          <IPaySubHeadlineText regular={false} text={title} />
          <IPayView style={styles.topRightIconContainer}>
            <IPayIcon icon={icons.alertWaring} color={colors.error.error800} />
          </IPayView>
        </IPayView>
        <IPayTitle2Text regular={false} text="DISABLED_MODULES.UNAVAILABLE_FEATURE" style={styles.commonTextStyle} />
        <IPayCaption1Text
          text="DISABLED_MODULES.UNAVAILABLE_FEATURE_DESCRIPTION"
          style={[styles.commonTextStyle, styles.descriptionText]}
          color={colors.primary.primary800}
        />
        <IPayPrimaryButton large btnIconsDisabled btnText="COMMON.DONE" onPress={onClose} />
      </IPayView>
    </IPayPortalBottomSheet>
  );
};

export default IPayDisabledModulesSheet;
