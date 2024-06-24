import { IPayLinearGradientView, IPayView } from '@app/components/atoms';
import IPayOverlay from '@app/components/atoms/ipay-overlay/ipay-overlay.component';
import FullWindowOverlay from '@app/components/organism/ipay-bottom-sheet-home/ipay-full-window-home-overlay';
import useTheme from '@app/styles/hooks/theme.hook';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import IPayBottomSheetHandle from './ipay-bottom-sheet-handle.component';
import { IPayBottomSheetProps } from './ipay-bottom-sheet.interface';
import bottonSheetStyles from './ipay-bottom-sheet.style';

const IPayBottomSheet = forwardRef<BottomSheetModal, IPayBottomSheetProps>(
  (
    {
      children,
      customSnapPoint,
      enableDynamicSizing,
      simpleHeader,
      heading,
      enablePanDownToClose,
      onCloseBottomSheet,
      simpleHeaderBar,
      containerStyle,
      simpleTitleStyle
    },
    ref
  ) => {
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const { colors } = useTheme();
    const styles = bottonSheetStyles(colors);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const newSnapPoint = customSnapPoint || (!customSnapPoint && ['25%', '50%', '80%']);
    const snapPoints = useMemo(() => newSnapPoint, []);

    const handlePresentModalPress = useCallback(() => {
      setOverlayVisible(true);
      bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
      if (index < 1) setOverlayVisible(false);
    }, []);

    const containerComponent = useCallback((props: any) => <FullWindowOverlay>{props.children}</FullWindowOverlay>, []);

    const onPressClose = () => {
      bottomSheetModalRef.current?.close();
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
        if (onCloseBottomSheet) onCloseBottomSheet();
      }
    };

    return (
      <IPayView style={[styles.bottomSheetContainerStyle, containerStyle]}>
        <BottomSheetModalProvider>
          {overlayVisible && <IPayOverlay style={styles.overlay} />}
          <BottomSheetModal
            name="BottomSheet"
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
            containerComponent={Platform.OS === 'ios' ? containerComponent : undefined}
            handleComponent={() => (
              <IPayBottomSheetHandle
                heading={heading}
                simpleHeader={simpleHeader}
                onPressCancel={onPressClose}
                onPressDone={onPressClose}
                simpleHeaderBar={simpleHeaderBar}
                simpleTitleStyle={simpleTitleStyle}
              />
            )}
          >
            <IPayLinearGradientView gradientColors={colors.bottomsheetGradient}>
              <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
            </IPayLinearGradientView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </IPayView>
    );
  }
);

export default IPayBottomSheet;
