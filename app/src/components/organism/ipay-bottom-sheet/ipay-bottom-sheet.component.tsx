import { IPayLinearGradientView } from '@app/components/atoms';
import { ToastProvider } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useTheme from '@app/styles/hooks/theme.hook';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { Platform } from 'react-native';
import IPayBottomSheetHandle from './ipay-bottom-sheet-handle.component';
import { IPayBottomSheetProps } from './ipay-bottom-sheet.interface';
import bottonSheetStyles from './ipay-bottom-sheet.style';
import FullWindowOverlay from './ipay-full-window-overlay';

const IPayBottomSheet = forwardRef<BottomSheetModal, IPayBottomSheetProps>(
  (
    {
      testId,
      children,
      customSnapPoint,
      enableDynamicSizing,
      simpleHeader,
      heading,
      enablePanDownToClose,
      simpleBar,
      gradientBar,
      cancelBnt,
      disabled,
      doneBtn,
      backBtn,
      doneText,
      onCloseBottomSheet,
      bold,
      doneButtonStyle,
      cancelButtonStyle,
      onDone,
      isPanningGesture = false,
      closeBottomSheetOnDone = true,
      bottomSheetBgStyles,
      bgGradientColors,
      headerContainerStyles,
      noGradient = true,
      animate = true,
      testID,
      enableOverDrag,
      enableHandlePanningGesture,
      stopCloseBackgroundPress = false,
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const styles = bottonSheetStyles(colors);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const newSnapPoint = customSnapPoint || ['25%', '50%', '80%'];
    const snapPoints = useMemo(() => newSnapPoint, [customSnapPoint]);
    const gradient = bgGradientColors || colors.bottomsheetGradient;

    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback(() => {}, []);

    const containerComponent = useCallback((props: any) => <FullWindowOverlay>{props.children}</FullWindowOverlay>, []);

    const onPressClose = () => {
      setTimeout(() => {
        bottomSheetModalRef.current?.forceClose();
      }, 0);
    };

    const onPressDone = () => {
      if (onDone) onDone();
      if (closeBottomSheetOnDone) onPressClose();
    };

    useImperativeHandle(ref, () => ({
      present: handlePresentModalPress,
      close: onPressClose,
      dismiss: () => bottomSheetModalRef.current?.dismiss(),
      snapToIndex: (index: number) => bottomSheetModalRef.current?.snapToIndex(index),
      snapToPosition: (position: string | number) => bottomSheetModalRef.current?.snapToPosition(position),
      expand: () => bottomSheetModalRef.current?.expand(),
      collapse: () => bottomSheetModalRef.current?.collapse(),
      forceClose: () => bottomSheetModalRef.current?.forceClose(), // Add forceClose method
    }));

    const onAnimate = (fromIndex: number, toIndex: number) => {
      if (toIndex < 1) {
        bottomSheetModalRef.current?.forceClose();
        if (onCloseBottomSheet) onCloseBottomSheet();
      }
    };

    // renders
    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          pressBehavior={stopCloseBackgroundPress ? 'none' : 'close'}
          {...props}
          opacity={1}
          style={[props.style, styles.overlayStyle]}
        />
      ),
      [],
    );

    const handleComponent = () => (
      <IPayBottomSheetHandle
        simpleBar={simpleBar}
        gradientBar={gradientBar}
        cancelBnt={cancelBnt}
        doneBtn={doneBtn}
        heading={heading}
        simpleHeader={simpleHeader}
        backBtn={backBtn}
        doneButtonStyle={doneButtonStyle}
        disabled={disabled}
        cancelButtonStyle={cancelButtonStyle}
        doneText={doneText}
        onPressCancel={onPressClose}
        onPressDone={onPressDone}
        bold={bold}
        bgGradientColors={
          noGradient ? [colors.backgrounds.greyOverlay, colors.backgrounds.greyOverlay] : bgGradientColors
        }
        headerContainerStyles={[headerContainerStyles, noGradient && styles.borderRadius]}
      />
    );

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          keyboardBehavior="fillParent"
          backdropComponent={renderBackdrop}
          name="BottomSheet"
          enableDismissOnClose
          onDismiss={
            animate && !stopCloseBackgroundPress ? () => bottomSheetModalRef.current?.close() : onCloseBottomSheet
          }
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          onAnimate={animate ? onAnimate : () => {}}
          stackBehavior="push"
          backgroundStyle={[styles.backgroundStyle, bottomSheetBgStyles]}
          enableDynamicSizing={enableDynamicSizing}
          enablePanDownToClose={enablePanDownToClose}
          enableContentPanningGesture={isPanningGesture}
          enableOverDrag={enableOverDrag}
          enableHandlePanningGesture={enableHandlePanningGesture}
          containerComponent={Platform.OS === 'ios' ? containerComponent : undefined}
          handleComponent={handleComponent}
        >
          <IPayLinearGradientView
            gradientColors={noGradient ? [colors.backgrounds.greyOverlay, colors.backgrounds.greyOverlay] : gradient}
            testID={`${testId}-bottom-sheet-view`}
          >
            <ToastProvider>
              <BottomSheetView testID={testID} style={styles.contentContainer}>
                {children}
              </BottomSheetView>
            </ToastProvider>
          </IPayLinearGradientView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

export default IPayBottomSheet;
