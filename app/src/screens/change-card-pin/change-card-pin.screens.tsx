import constants from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';

import { BulkLock } from '@app/assets/svgs';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangeCardPinProps, ChangeCardPinViewTypes } from './change-card-pin.interface';
import changeCardPinStyles from './change-card-pin.style';

const IPayChangeCardPin = forwardRef(({ onSuccess }: ChangeCardPinProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = changeCardPinStyles();
  const [passcodeError, setPasscodeError] = useState(false);
  const [currentView, setCurrentView] = useState<ChangeCardPinViewTypes>(ChangeCardPinViewTypes.NewPin);
  const [newPin, setNewPin] = useState<string>('');
  const [clearPin, setClearPin] = useState<boolean>();
  const [apiError] = useState<string>('');

  const getTitle = () => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return t('CHANGE_PIN.CURRENT_PIN_CODE');
      case ChangeCardPinViewTypes.NewPin:
        return t('CHANGE_PIN.NEW_PIN_CODE');
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return t('CHANGE_PIN.CONFIRM_NEW_PIN');
      default:
        return '';
    }
  };

  const getDescription = () => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return t('CHANGE_PIN.ENTER_CURRENT_PASS');
      case ChangeCardPinViewTypes.NewPin:
        return t('CHANGE_PIN.YOU_WILL_NEED_TO');
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return t('CHANGE_PIN.ENTER_PASS_AGAIN');
      default:
        return '';
    }
  };

  const getErrorDescription = () => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return t('CHANGE_PIN.PLEASE_ENSURE_PASSCODE');
      case ChangeCardPinViewTypes.NewPin:
        return t('CHANGE_PIN.OLD_PIN');
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return t('CHANGE_PIN.ENSURE_YOU_WRITE');
      default:
        return '';
    }
  };

  const { showToast } = useToastContext();

  const onVerifyPin = (enteredCode: string) => enteredCode === '1234'; // TODO: pincode hardcoded for now will be change later

  const checkIfPinNotOldPin = (enteredCode: string) => enteredCode !== '1234';

  const isPinMatched = (enteredCode: string) => enteredCode === newPin;

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
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
          renderToast(getErrorDescription());
        }
        break;
      case ChangeCardPinViewTypes.NewPin:
        if (checkIfPinNotOldPin(enteredCode)) {
          setNewPin(enteredCode);
          setCurrentView(ChangeCardPinViewTypes.ConfirmNewPin);
          setClearPin((prev) => !prev);
        } else {
          setPasscodeError(true);
          renderToast(getErrorDescription());
        }
        break;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        if (isPinMatched(enteredCode)) {
          if (onSuccess) {
            onSuccess(enteredCode);
          }
        } else {
          setPasscodeError(true);
          renderToast(getErrorDescription());
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
        <IPayPageDescriptionText style={styles.headingContainerStyle} heading={getTitle()} text={getDescription()} />
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
