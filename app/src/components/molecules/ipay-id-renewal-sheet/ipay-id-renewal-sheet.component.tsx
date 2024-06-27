import { IPayCaption1Text, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayBottomSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import OtpVerificationComponent from '@app/screens/auth/forgot-passcode/otp-verification.component';
import colors from '@app/styles/colors.const';
import { IdRenewalState } from '@app/utilities/enums.util';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { IPayButton } from '..';
import { useIdRenewal } from './ipay-id-renewal-sheet-helper';
import { IPayIdRenewalSheetProps } from './ipay-id-renewal-sheet.interface';
import styles from './ipay-id-renewal-sheet.style';

const IPayIdRenewalSheet = forwardRef<any, IPayIdRenewalSheetProps>(({ confirm }, ref) => {
  const bottomSheetRef = useRef<any>();
  const localizationText = useLocalization();
  const [idRenewalState, setIdRenewalState] = useState<IdRenewalState>(IdRenewalState.EXPIRE_FLAG_REACHED);
  const [renewId, setRenewId] = useState(false);

  const handleSkip = () => {
    setRenewId(false);
    setTimeout(() => {
      bottomSheetRef.current?.close();
    }, 100);
  };
  const [customSnapPoints, setCustomSnapPoints] = useState<string[]>(['40%', '60%', '99%']); // Initial snap points
  const { title, subtitle, primaryButtonText, secondaryButtonText, icon, buttonIcon } = useIdRenewal(
    idRenewalState,
    colors,
  );
  useImperativeHandle(ref, () => ({
    present: () => {
      bottomSheetRef.current?.present();
      setCustomSnapPoints(['40%', '60%', '99%']);
    },
    close: () => {
      bottomSheetRef.current?.close();
    },
  }));
  const handleRenewalId = () => {
    if (idRenewalState === IdRenewalState.EXPIRE_FLAG_REACHED) {
      setRenewId(true);
      setCustomSnapPoints(['98%', '99%']);
    } else {
      bottomSheetRef.current?.close();
    }
  };
  const onConfirm = () => {
    confirm();
    handleSkip();
  };

  const handleOnPressHelp = () => {};
  return (
    <IPayBottomSheet
      heading={localizationText.id_renewal}
      onCloseBottomSheet={handleSkip}
      customSnapPoint={customSnapPoints}
      ref={bottomSheetRef}
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
            onPress={handleRenewalId}
            btnStyle={styles.buttonStyle}
            btnType="primary"
            btnText={primaryButtonText}
            textColor={colors.natural.natural0}
            rightIcon={<IPayIcon icon={buttonIcon} size={moderateScale(20)} color={colors.natural.natural0} />}
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
  );
});

export default IPayIdRenewalSheet;
