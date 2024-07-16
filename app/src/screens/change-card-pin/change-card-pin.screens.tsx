import icons from '@assets/icons/index';
import useTheme from '@app/styles/hooks/theme.hook';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';

import { BulkLock } from '@app/assets/svgs';
import { IPayPasscode } from '@app/components/organism';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { forwardRef, useState } from 'react';
import { IPayPageDescriptionText } from '@app/components/molecules';
import changeCardPinStyles from './change-card-pin.style';
import { ChangeCardPinViewTypes, ChangeCardPinProps } from './change-card-pin.interface';

const IPayChangeCardPin = forwardRef(({ onSuccess }: ChangeCardPinProps) => {
  const { colors } = useTheme();
  const styles = changeCardPinStyles();
  const localizationText = useLocalization();
  const [passcodeError, setPasscodeError] = useState(false);
  const [currentView, setCurrentView] = useState<ChangeCardPinViewTypes>(ChangeCardPinViewTypes.CurrentPin);
  const [newPin, setNewPin] = useState<string>('');
  const [clearPin, setClearPin] = useState<boolean>();

  const getTitle = () => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return localizationText.CHANGE_PIN.CURRENT_PIN_CODE;
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.CHANGE_PIN.NEW_PIN_CODE;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.CHANGE_PIN.CONFIRM_NEW_PIN;
      default:
        return '';
    }
  };

  const getDescription = () => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return localizationText.CHANGE_PIN.ENTER_CURRENT_PASS;
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.CHANGE_PIN.YOU_WILL_NEED_TO;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.CHANGE_PIN.ENTER_PASS_AGAIN;
      default:
        return '';
    }
  };

  const getErrorTitle = () => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return localizationText.CHANGE_PIN.PIN_INCORRECT;
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.CHANGE_PIN.INVALID_PIN;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.CHANGE_PIN.PIN_NOT_MATCHING;
      default:
        return '';
    }
  };

  const getErrorDescription = () => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return localizationText.CHANGE_PIN.PLEASE_ENSURE_PASSCODE;
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.CHANGE_PIN.OLD_PIN;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.CHANGE_PIN.ENSURE_YOU_WRITE;
      default:
        return '';
    }
  };

  const { showToast } = useToastContext();

  const onVerifyPin = (enteredCode: string) => enteredCode === '1234'; // TODO: pincode hardcoded for now will be change later

  const checkIfPinNotOldPin = (enteredCode: string) => enteredCode !== '1234';

  const isPinMatched = (enteredCode: string) => enteredCode === newPin;

  const renderToast = () => {
    showToast({
      title: getErrorTitle(),
      subTitle: getErrorDescription(),
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const onEnterPassCode = (enteredCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (enteredCode.length !== 4) return;

    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        if (onVerifyPin(enteredCode)) {
          setCurrentView(ChangeCardPinViewTypes.NewPin);
          setClearPin((prev) => !prev);
        } else {
          setPasscodeError(true);
          renderToast();
        }
        break;
      case ChangeCardPinViewTypes.NewPin:
        if (checkIfPinNotOldPin(enteredCode)) {
          setNewPin(enteredCode);
          setCurrentView(ChangeCardPinViewTypes.ConfirmNewPin);
          setClearPin((prev) => !prev);
        } else {
          setPasscodeError(true);
          renderToast();
        }
        break;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        if (isPinMatched(enteredCode)) {
          setClearPin((prev) => !prev);
          if (onSuccess) {
            onSuccess();
          }
        } else {
          setPasscodeError(true);
          renderToast();
        }
        break;
      default:
    }
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <BulkLock />
      </IPayView>
      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText heading={getTitle()} text={getDescription()} />
      </IPayView>
      <IPayView style={styles.pincodeViewContainer}>
        <IPayPasscode
          clearPin={clearPin}
          passcodeError={passcodeError}
          data={constants.DIALER_DATA}
          onEnterPassCode={onEnterPassCode}
        />
      </IPayView>
    </IPayView>
  );
});

export default IPayChangeCardPin;
