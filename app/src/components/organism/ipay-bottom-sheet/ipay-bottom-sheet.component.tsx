import { IPayLinearGradientView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useImperativeHandle, useMemo } from 'react';
import { Platform } from 'react-native';
import IPayBottomSheetHandle from './ipay-bottom-sheet-handle.component';
import { IPayBottomSheetProps } from './ipay-bottom-sheet.interface';
import bottonSheetStyles from './ipay-bottom-sheet.style';
import FullWindowOverlay from './ipay-full-window-overlay';

const IPayBottomSheet = React.forwardRef<BottomSheetModal, IPayBottomSheetProps>(({ children }, ref) => {
  const { colors } = useTheme();
  const styles = bottonSheetStyles(colors);

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => { }, []);

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

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        name="BottomSheet"
        enableDismissOnClose
        onDismiss={() => bottomSheetModalRef.current?.close()}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        stackBehavior="replace"
        enableDynamicSizing
        enablePanDownToClose
        containerComponent={Platform.OS === 'ios' ? containerComponent : undefined}
        handleComponent={() => <IPayBottomSheetHandle onPressCancel={onPressClose} onPressDone={onPressClose} />}
      >
        <IPayLinearGradientView gradientColors={colors.bottomsheetGradient}>
          <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
        </IPayLinearGradientView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default IPayBottomSheet;
