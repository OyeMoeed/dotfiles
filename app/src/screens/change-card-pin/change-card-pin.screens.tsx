import React from 'react';

import icons from '@assets/icons/index';
import useTheme from '@app/styles/hooks/theme.hook';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import changeCardPinStyles from './change-card-pin.style';

import { BulkLock } from '@app/assets/svgs';
import { IPayPasscode } from '@app/components/organism';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { forwardRef, useState } from 'react';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { ChangeCardPinViewTypes, ChangeCardPinProps } from './change-card-pin.interface';

const ChangePinCurrentPin = forwardRef(({ onSuccess }: ChangeCardPinProps) => {
  const { colors } = useTheme();
  const styles = changeCardPinStyles(colors);
  const localizationText = useLocalization();
  const [passcodeError, setPasscodeError] = useState(false);
  const [currentView, setCurrentView] = useState<ChangeCardPinViewTypes>(ChangeCardPinViewTypes.CurrentPin);
  const [newPin, setNewPin] = useState<string>('');
  const [clearPin, setClearPin] = useState<boolean>();

  const getScreenTitle = (currentView: string) => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return localizationText.current_pin_code;
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.new_pin_code;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.confirm_new_pin;
      default:
        return '';
    }
  };

  const getScreenDescription = (currentView: string) => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return localizationText.enter_current_pass;
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.you_will_need_to;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.enter_pass_again;
      default:
        return '';
    }
  };

  const getErrorTitle = (currentView: string) => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return localizationText.pin_incorrect;
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.invalid_pin;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.pin_not_matching;
      default:
        return '';
    }
  };

  const getErrorDescription = (currentView: string) => {
    switch (currentView) {
      case ChangeCardPinViewTypes.CurrentPin:
        return localizationText.please_ensure_passcode;
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.old_pin;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.ensure_you_write;
      default:
        return '';
    }
  };

  const { showToast } = useToastContext();

  const onVerifyPin = (enteredCode: string) => {
    if (enteredCode === '1234') {
      return true;
    } else {
      return false;
    }
  };

  const checkIfPinNotOldPin = (enteredCode: string) => {
    if (enteredCode != '1234') {
      return true;
    } else {
      return false;
    }
  };

  const isPinMatched = (enteredCode: string) => {
    if (enteredCode === newPin) {
      return true;
    } else {
      return false;
    }
  };

  const onEnterPassCode = (enteredCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (enteredCode.length == 4) {
      if (currentView == ChangeCardPinViewTypes.CurrentPin) {
        if (onVerifyPin(enteredCode)) {
          setCurrentView(ChangeCardPinViewTypes.NewPin);
          setClearPin((prev) => !prev);
        } else {
          setPasscodeError(true);
          renderToast();
        }
      } else if (currentView == ChangeCardPinViewTypes.NewPin) {
        if (checkIfPinNotOldPin(enteredCode)) {
          setNewPin(enteredCode);
          setCurrentView(ChangeCardPinViewTypes.ConfirmNewPin);
          setClearPin((prev) => !prev);
        } else {
          setPasscodeError(true);
          renderToast();
        }
      } else if (currentView == ChangeCardPinViewTypes.ConfirmNewPin) {
        if (isPinMatched(enteredCode)) {
          setClearPin((prev) => !prev);
          onSuccess && onSuccess();
        } else {
          setPasscodeError(true);
          renderToast();
        }
      }
    }
  };

  const renderToast = () => {
    showToast({
      title: getErrorTitle(currentView),
      subTitle: getErrorDescription(currentView),
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <BulkLock />
      </IPayView>
      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText heading={getScreenTitle(currentView)} text={getScreenDescription(currentView)} />
      </IPayView>
      <IPayView style={{ flex: 1 }}>
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

export default ChangePinCurrentPin;
