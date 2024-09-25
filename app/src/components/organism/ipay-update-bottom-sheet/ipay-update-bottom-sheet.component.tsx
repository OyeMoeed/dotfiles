import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

import icons from '@app/assets/icons';
import { buttonVariants } from '@app/utilities';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTypedSelector } from '@app/store/store';
import { IPayButton } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { IPayIcon, IPayText, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { openAppOrStore } from '@app/utilities/linking-utils';
import { MAIN_APP_STORE_LINKS } from '@app/constants/constants';

import { IPayUpdateComponentSheetProps } from './ipay-update-bottom-sheet.interface';
import forceUpdateStyle from './ipay-update-bottom-sheet.style';

const IPayUpdateBottomSheet = forwardRef<{}, IPayUpdateComponentSheetProps>((_, ref) => {
  const { colors } = useTheme();
  const styles = forceUpdateStyle();
  const size = useTypedSelector((state) => state.dropdownReducer.size);

  const bottomSheetModalRef = useRef<bottomSheetTypes>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useImperativeHandle(ref, () => ({
    present: handlePresentModalPress,
    close: handleClosePress,
  }));

  useEffect(() => {
    handlePresentModalPress();
  }, []);

  const onPressAppUpdate = async () => {
    await openAppOrStore(MAIN_APP_STORE_LINKS);
  };

  return (
    <IPayBottomSheet
      isVisible
      heading="UPDATE.HEADER"
      customSnapPoint={size}
      ref={bottomSheetModalRef}
      simpleHeader
      simpleBar
      bold
      closeBottomSheetOnDone={false}
      isPanningGesture={false}
      enableDynamicSizing={false}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      enableOverDrag={false}
      stopCloseBackgroundPress
    >
      <IPayView style={styles.container}>
        <IPayIcon icon={icons.danger_light} size={85} />
        <IPayTitle2Text text="UPDATE.TITLE" style={styles.mainText} />
        <IPayText style={styles.subTitleText} text="UPDATE.SUBTITLE" />
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          medium
          btnStyle={styles.updateButton}
          btnIconsDisabled
          btnColor={colors.primary.primary500}
          btnText="UPDATE.BUTTON_TITLE"
          onPress={onPressAppUpdate}
        />
      </IPayView>
    </IPayBottomSheet>
  );
});

export default IPayUpdateBottomSheet;
