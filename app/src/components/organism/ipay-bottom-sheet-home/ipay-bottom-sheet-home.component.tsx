import { IPayLinearGradientView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { IPayBottomSheetHomeProps } from './ipay-bottom-sheet-home.interface';
import bottonSheetStyles from './ipay-bottom-sheet-home.style';
import FullWindowOverlay from './ipay-full-window-home-overlay';

const IPayBottomSheetHome: React.FC = forwardRef<BottomSheetModal, IPayBottomSheetHomeProps>(
  (
    {
      testID,
      children,
      customSnapPoint,
      enableDynamicSizing,
      simpleHeader,
      heading,
      enablePanDownToClose,
      onCloseBottomSheet,
      style
    },
    ref
  ) => {
    const [indexValue, setIndexValue] = useState<number>(1);
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const { colors } = useTheme();
    const styles = bottonSheetStyles(colors);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const newSnapPoint = customSnapPoint || ['30%', '36%', '96%'];
    const snapPoints = useMemo(() => newSnapPoint, []);
    const [enableClose, setEnableClose] = useState<boolean>(true);
    const handlePresentModalPress = useCallback(() => {
      setIndexValue(1);
      setOverlayVisible(true);
      bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
      if (index === -1) {
        setEnableClose(false);
      } else {
        setEnableClose(true);
      }
      if (index < 1) setOverlayVisible(false);
    }, []);

    const containerComponent = useCallback((props: any) => <FullWindowOverlay>{props.children}</FullWindowOverlay>, []);

    const onPressClose = () => {
      setIndexValue(-1);
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

    const handleComponent = () => (
      <IPayLinearGradientView
        gradientColors={[colors.secondary.secondary300, colors.primary.primary500]}
        style={styles.logoContainer}
      >
        <icons.logoIcon />
      </IPayLinearGradientView>
    );

    return (
      <IPayView testID={`${testID}-bottom-sheet`} style={[styles.bottomSheetContainerStyle]}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            style={styles.bottmModalStyle}
            name="BottomSheet"
            enableDismissOnClose={false}
            enableHandlePanningGesture={enableClose}
            onDismiss={() => bottomSheetModalRef.current?.close()}
            ref={bottomSheetModalRef}
            index={indexValue}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            onAnimate={onAnimate}
            stackBehavior="replace"
            enableDynamicSizing={enableDynamicSizing}
            enablePanDownToClose={enablePanDownToClose}
            containerComponent={Platform.OS === 'ios' ? containerComponent : undefined}
            handleComponent={() => handleComponent()}
          >
            <IPayLinearGradientView
              style={styles.bottomSheetStyle}
              gradientColors={[colors?.secondary?.secondary300, colors?.primary?.primary500]}
            >
              <IPayLinearGradientView style={styles.childContainer} gradientColors={colors.bottomsheetGradient}>
                <BottomSheetView style={[styles.contentContainer, style]}>{children}</BottomSheetView>
              </IPayLinearGradientView>
            </IPayLinearGradientView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </IPayView>
    );
  }
);

export default IPayBottomSheetHome;
