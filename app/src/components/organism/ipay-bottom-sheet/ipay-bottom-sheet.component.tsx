import { IPayLinearGradientView } from '@app/components/atoms';
import IPayOverlay from '@app/components/atoms/ipay-overlay/ipay-overlay.component';
import useTheme from '@app/styles/hooks/theme.hook';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import IPayBottomSheetHandle from './ipay-bottom-sheet-handle.component';
import { IPayBottomSheetProps } from './ipay-bottom-sheet.interface';
import bottonSheetStyles from './ipay-bottom-sheet.style';
import FullWindowOverlay from './ipay-full-window-overlay';

const IPayBottomSheet = forwardRef<BottomSheetModal, IPayBottomSheetProps>(
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
      onCloseBottomSheet,
      bold,
      isPanningGesture = false
    },
    ref
  ) => {
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const { colors } = useTheme();
    const styles = bottonSheetStyles(colors);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const newSnapPoint = customSnapPoint || ['25%', '50%', '80%'];
    const snapPoints = useMemo(() => newSnapPoint, [customSnapPoint]);

    const handlePresentModalPress = useCallback(() => {
      setOverlayVisible(true);
      bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
      index < 1 && setOverlayVisible(false);
    }, []);

    const containerComponent = useCallback((props: any) => <FullWindowOverlay>{props.children}</FullWindowOverlay>, []);

    const onPressClose = () => {
      setOverlayVisible(false);
      setTimeout(() => {
        bottomSheetModalRef.current?.forceClose();
      }, 0);
    };

    useImperativeHandle(ref, () => ({
      present: handlePresentModalPress,
      close: onPressClose,
      dismiss: () => bottomSheetModalRef.current?.dismiss(),
      snapToIndex: (index: number) => bottomSheetModalRef.current?.snapToIndex(index),
      snapToPosition: (position: string | number) => bottomSheetModalRef.current?.snapToPosition(position),
      expand: () => bottomSheetModalRef.current?.expand(),
      collapse: () => bottomSheetModalRef.current?.collapse(),
      forceClose: () => bottomSheetModalRef.current?.forceClose() // Add forceClose method
    }));

    const onAnimate = (fromIndex: number, toIndex: number) => {
      if (toIndex < 1) {
        bottomSheetModalRef.current?.forceClose();
        onCloseBottomSheet && onCloseBottomSheet();
      }
    };

    return (
      <BottomSheetModalProvider>
        {overlayVisible && <IPayOverlay style={styles.overlay} />}
        <BottomSheetModal
          name={'BottomSheet'}
          enableDismissOnClose
          onDismiss={() => bottomSheetModalRef.current?.close()}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          onAnimate={onAnimate}
          stackBehavior="replace"
          enableDynamicSizing={enableDynamicSizing}
          enablePanDownToClose={enablePanDownToClose}
          enableContentPanningGesture={isPanningGesture}
          containerComponent={Platform.OS === 'ios' ? containerComponent : undefined}
          handleComponent={() => (
            <IPayBottomSheetHandle
              simpleBar={simpleBar}
              gradientBar={gradientBar}
              cancelBnt={cancelBnt}
              doneBtn={doneBtn}
              heading={heading}
              simpleHeader={simpleHeader}
              backBtn={backBtn}
              onPressCancel={onPressClose}
              onPressDone={onPressClose}
              bold={bold}
            />
          )}
        >
          <IPayLinearGradientView gradientColors={colors.bottomsheetGradient}>
            <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
          </IPayLinearGradientView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);

export default IPayBottomSheet;
