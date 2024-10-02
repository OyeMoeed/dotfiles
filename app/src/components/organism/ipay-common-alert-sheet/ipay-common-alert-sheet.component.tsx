import { IPayCaption1Text, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { IPayCommonAlertSheetProps } from './ipay-common-alert-sheet.interface';
import commonAlertSheet from './ipay-common-alert-sheet.styles';

const IPayCommonAlertSheet = forwardRef<{}, IPayCommonAlertSheetProps>(
  (
    {
      onBtnPress,
      btnTitle,
      btnStyles,
      headerTitle,
      isForceAlert,
      title,
      subtitle,
      icon,
      titleStyle,
      withCancelBtn,
      onCloseBottomSheet,
      buttonRightIcon,
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const styles = commonAlertSheet();

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

    return (
      <IPayBottomSheet
        isVisible={false}
        cancelBnt={withCancelBtn}
        heading={headerTitle}
        ref={bottomSheetModalRef}
        simpleHeader
        simpleBar
        bold
        closeBottomSheetOnDone={!isForceAlert}
        isPanningGesture={!isForceAlert}
        enableDynamicSizing={!isForceAlert}
        enablePanDownToClose={!isForceAlert}
        enableHandlePanningGesture={!isForceAlert}
        enableOverDrag={!isForceAlert}
        stopCloseBackgroundPress={isForceAlert}
        onCloseBottomSheet={onCloseBottomSheet}
      >
        <IPayView style={styles.container}>
          <IPayIcon icon={icon} size={85} />
          <IPayTitle2Text text={title} regular={false} style={[styles.mainText, titleStyle]} />
          <IPayCaption1Text color={colors.primary.primary800} style={styles.subTitleText} text={subtitle} />
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            medium
            btnStyle={[styles.button, btnStyles]}
            btnIconsDisabled
            btnColor={colors.primary.primary500}
            btnText={btnTitle}
            onPress={onBtnPress}
            rightIcon={buttonRightIcon}
          />
        </IPayView>
      </IPayBottomSheet>
    );
  },
);

export default IPayCommonAlertSheet;
