import { IPayLinearGradientView } from '@app/components/atoms';
import { SpinnerProvider } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { ToastProvider } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useTheme from '@app/styles/hooks/theme.hook';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useRef } from 'react';
import { Portal } from 'react-native-portalize';
import IPayBottomSheetHandle from './ipay-bottom-sheet-handle.component';
import { IPayBottomSheetProps } from './ipay-bottom-sheet.interface';
import bottonSheetStyles from './ipay-bottom-sheet.style';
const IPayPortalBottomSheet = forwardRef<BottomSheetModal, IPayBottomSheetProps>(
  (
    {
      children,
      customSnapPoint,
      enableDynamicSizing,
      simpleHeader,
      heading,
      enablePanDownToClose,
      simpleBar,
      gradientBar,
      cancelBnt,
      doneBtn,
      backBtn,
      doneText,
      onCloseBottomSheet,
      bold,
      doneButtonStyle,
      cancelButtonStyle,
      isPanningGesture = false,
      bottomSheetBgStyles,
      bgGradientColors,
      headerContainerStyles,
      noGradient,
      isVisible,
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const styles = bottonSheetStyles(colors);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const gradient = bgGradientColors || colors.bottomsheetGradient;
    const handleSheetChanges = useCallback(() => {}, []);
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="none"
          {...props}
          opacity={1}
          style={[props.style, styles.overlayStyle]}
        />
      ),
      [],
    );

    if (!isVisible) {
      return <></>;
    }
    return (
      <Portal>
        <BottomSheet
          keyboardBehavior="fillParent"
          backdropComponent={renderBackdrop}
          ref={bottomSheetModalRef}
          onClose={onCloseBottomSheet}
          enableOverDrag
          snapPoints={customSnapPoint}
          onChange={handleSheetChanges}
          backgroundStyle={[styles.backgroundStyle, bottomSheetBgStyles]}
          enableDynamicSizing={enableDynamicSizing}
          enablePanDownToClose={enablePanDownToClose}
          enableContentPanningGesture={isPanningGesture}
          handleComponent={() => (
            <IPayBottomSheetHandle
              simpleBar={simpleBar}
              gradientBar={gradientBar}
              cancelBnt={cancelBnt}
              doneBtn={doneBtn}
              heading={heading}
              simpleHeader={simpleHeader}
              backBtn={backBtn}
              doneButtonStyle={doneButtonStyle}
              cancelButtonStyle={cancelButtonStyle}
              doneText={doneText}
              onPressCancel={onCloseBottomSheet}
              onPressDone={onCloseBottomSheet}
              bold={bold}
              bgGradientColors={
                noGradient ? [colors.backgrounds.greyOverlay, colors.backgrounds.greyOverlay] : bgGradientColors
              }
              headerContainerStyles={[headerContainerStyles, noGradient && styles.borderRadius]}
            />
          )}
        >
          <IPayLinearGradientView
            gradientColors={noGradient ? [colors.backgrounds.greyOverlay, colors.backgrounds.greyOverlay] : gradient}
          >
            <SpinnerProvider>
              <ToastProvider>
                <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
              </ToastProvider>
            </SpinnerProvider>
          </IPayLinearGradientView>
        </BottomSheet>
      </Portal>
    );
  },
);

export default IPayPortalBottomSheet;
