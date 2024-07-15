import { IPayCaption1Text, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayBottomSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import OtpVerificationComponent from '@app/screens/auth/forgot-passcode/otp-verification.component';
import colors from '@app/styles/colors.const';
import { IdRenewalState } from '@app/utilities/enums.util';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { IPayButton } from '..';
import { useIdRenewal } from './ipay-id-renewal-sheet-helper';
import { IPayIdRenewalSheetProps } from './ipay-id-renewal-sheet.interface';
import styles from './ipay-id-renewal-sheet.style';

const IPayIdRenewalSheet = forwardRef<any, IPayIdRenewalSheetProps>(({ confirm }, ref) => {
  const idRenewalBottomSheet = useRef<any>();
  const helpBottomSheetRef = useRef<any>(); // Ref for the help bottom sheet
  const localizationText = useLocalization();
  const [idRenewalState, setIdRenewalState] = useState<IdRenewalState>(IdRenewalState.EXPIRE_FLAG_REACHED);
  const [renewId, setRenewId] = useState(false);
  const [isHelpBottomSheetVisible, setIsHelpBottomSheetVisible] = useState(false);

  const handleSkip = () => {
    setRenewId(false);
  };

  const [customSnapPoints, setCustomSnapPoints] = useState<string[]>(['40%', '60%', '99%']); // Initial snap points

  const { title, subtitle, primaryButtonText, secondaryButtonText, icon, buttonIcon } = useIdRenewal(
    idRenewalState,
    colors,
  );

  useImperativeHandle(ref, () => ({
    present: () => {
      idRenewalBottomSheet.current?.present();
      setCustomSnapPoints(['40%', '70%']);
    },
    close: () => {
      idRenewalBottomSheet.current?.close();
    },
  }));

  const handleRenewalId = () => {
    if (idRenewalState === IdRenewalState.EXPIRE_FLAG_REACHED) {
      setRenewId(true);
      setCustomSnapPoints(['98%', '99%']);
    } else {
      idRenewalBottomSheet.current?.present();
    }
  };

  const onConfirm = () => {
    idRenewalBottomSheet.current?.close();
    confirm();
    handleSkip();
  };

  const handleOnPressHelp = () => {
    helpBottomSheetRef.current?.present(); // Close the main bottom sheet
    setIsHelpBottomSheetVisible(true); // Show the help bottom sheet
  };

  return (
    <>
      <IPayBottomSheet
        heading={localizationText.ID_RENEWAL.TITLE}
        onCloseBottomSheet={handleSkip}
        customSnapPoint={customSnapPoints}
        ref={idRenewalBottomSheet}
        simpleHeader
        simpleBar
        bold
        cancelBnt={renewId}
      >
        {renewId ? (
          <OtpVerificationComponent onConfirmPress={onConfirm} showVerify onPressHelp={handleOnPressHelp} />
        ) : (
          <IPayView style={styles.profileContainer}>
            {icon}
            <IPayTitle2Text style={styles.titleTextStyle}>{title}</IPayTitle2Text>
            <IPayCaption1Text style={styles.captionTextStyle}>{subtitle}</IPayCaption1Text>
            <IPayButton
              large
              onPress={handleRenewalId}
              btnStyle={styles.buttonStyle}
              btnType="primary"
              btnText={primaryButtonText}
              textColor={colors.natural.natural0}
              rightIcon={<IPayIcon icon={buttonIcon} size={20} color={colors.natural.natural0} />}
            />
            <IPayButton
              onPress={handleSkip}
              btnStyle={styles.topStyles}
              btnType="link-button"
              btnText={secondaryButtonText}
              textStyle={styles.skipTextStyle}
              btnIconsDisabled
            />
          </IPayView>
        )}
      </IPayBottomSheet>

      {isHelpBottomSheetVisible && (
        <IPayBottomSheet
          heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
          onCloseBottomSheet={() => setIsHelpBottomSheetVisible(false)}
          customSnapPoint={['50%', '75%', '95%']}
          ref={helpBottomSheetRef}
          simpleHeader
          simpleBar
          cancelBnt
        >
          <HelpCenterComponent />
        </IPayBottomSheet>
      )}
    </>
  );
});

export default IPayIdRenewalSheet;
