import { LogoIcon } from '@app/assets/svgs/index';
import { IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayBlurView } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { IPayBottomSheetHomeProps } from './ipay-bottom-sheet-home.interface';
import bottonSheetStyles from './ipay-bottom-sheet-home.style';
import FullWindowOverlay from './ipay-full-window-home-overlay';

const IPayBottomSheetHome = forwardRef<BottomSheetModal, IPayBottomSheetHomeProps>(
  ({ children, customSnapPoint, enableDynamicSizing, enablePanDownToClose, onCloseBottomSheet, style }, ref) => {
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const { colors } = useTheme();
    const styles = bottonSheetStyles(colors);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const newSnapPoint = customSnapPoint || ['30%', '36%', '96%'];
    const snapPoints = useMemo(() => newSnapPoint, [customSnapPoint]);
    const [enableClose, setEnableClose] = useState<boolean>(true);
    const handlePresentModalPress = useCallback(() => {
      setOverlayVisible(true);
      bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
      console.log('bottom sheet_', index);
      if (index == -1) {
        setEnableClose(false);
      } else {
        setEnableClose(true);
      }
      index < 1 && setOverlayVisible(false);
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
      forceClose: () => bottomSheetModalRef.current?.forceClose(), // Add forceClose method
    }));

    const onAnimate = (fromIndex: number, toIndex: number) => {
      if (toIndex < 1) {
        bottomSheetModalRef.current?.forceClose();
        onCloseBottomSheet && onCloseBottomSheet();
      }
    };
    const content = (
      <BottomSheetModalProvider>
        <BottomSheetModal
          style={styles.bottmModalStyle}
          name={'BottomSheet'}
          enableDismissOnClose={false}
          enableHandlePanningGesture={enableClose}
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
            <>
              <IPayLinearGradientView
                gradientColors={[colors.secondary.secondary300, colors.primary.primary500]}
                style={styles.logoContainer}
              >
                <LogoIcon />
              </IPayLinearGradientView>
              <IPayBlurView />
            </>
          )}
        >
          <IPayLinearGradientView
            style={styles.bottomSheetStyle}
            gradientColors={[colors.secondary.secondary300, colors.primary.primary500]}
          >
            <BottomSheetView style={[styles.contentContainer, style]}>{children}</BottomSheetView>
          </IPayLinearGradientView>
          <IPayBlurView />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
    if (isAndroidOS) {
      return content;
    }
    return <IPayView style={styles.bottomSheetContainerStyle}>{content}</IPayView>;
  },
);

export default IPayBottomSheetHome;
