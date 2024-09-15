import { IPayLinearGradientView } from '@app/components/atoms';
import { ToastProvider } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useTheme from '@app/styles/hooks/theme.hook';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { Portal } from 'react-native-portalize';
import IPayBottomSheetHandle from './ipay-bottom-sheet-handle.component';
import { IPayPortalBottomSheetProps } from './ipay-bottom-sheet.interface';
import bottonSheetStyles from './ipay-bottom-sheet.style';

const IPayPortalBottomSheet = forwardRef<BottomSheetModal, IPayPortalBottomSheetProps>(
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
      isVisible = false,
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const styles = bottonSheetStyles(colors);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      present: () => bottomSheetModalRef.current?.snapToIndex(0),
      close: () => bottomSheetModalRef.current?.close(),
      dismiss: () => bottomSheetModalRef.current?.dismiss(),
      snapToIndex: (index: number) => bottomSheetModalRef.current?.snapToIndex(index),
      snapToPosition: (position: string | number) => bottomSheetModalRef.current?.snapToPosition(position),
      expand: () => bottomSheetModalRef.current?.expand(),
      collapse: () => bottomSheetModalRef.current?.collapse(),
      forceClose: () => bottomSheetModalRef.current?.forceClose(), // Add forceClose method
    }));
    const gradient = bgGradientColors || colors.bottomsheetGradient;
    const handleSheetChanges = useCallback(() => {}, []);
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
          {...props}
          opacity={1}
          style={[props.style, styles.overlayStyle]}
        />
      ),
      [],
    );

    const closeBottomSheet = () => {
      bottomSheetModalRef.current?.close();
    };

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
        cancelButtonStyle={cancelButtonStyle}
        doneText={doneText}
        onPressCancel={closeBottomSheet}
        onPressDone={closeBottomSheet}
        bold={bold}
        bgGradientColors={
          noGradient ? [colors.backgrounds.greyOverlay, colors.backgrounds.greyOverlay] : bgGradientColors
        }
        headerContainerStyles={[headerContainerStyles, noGradient && styles.borderRadius]}
      />
    );

    if (!isVisible) {
      return null;
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
          handleComponent={handleComponent}
        >
          <IPayLinearGradientView
            gradientColors={noGradient ? [colors.backgrounds.greyOverlay, colors.backgrounds.greyOverlay] : gradient}
          >
            <ToastProvider>
              <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
            </ToastProvider>
          </IPayLinearGradientView>
        </BottomSheet>
      </Portal>
    );
  },
);

export default IPayPortalBottomSheet;
