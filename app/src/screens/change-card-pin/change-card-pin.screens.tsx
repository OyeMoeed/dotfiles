import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';

import { BulkLock } from '@app/assets/svgs';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import { forwardRef, useCallback, useState } from 'react';
import { ChangeCardPinProps, ChangeCardPinViewTypes } from './change-card-pin.interface';
import changeCardPinStyles from './change-card-pin.style';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { ApiResponseStatusType, spinnerVariant } from '@app/utilities/enums.util';
import { resetPinCodeProp } from '@app/network/services/core/transaction/transaction.interface';
import { useTypedSelector } from '@app/store/store';
import { resetPinCode } from '@app/network/services/core/transaction/transactions.service';
import { encryptData } from '@app/network/utilities/encryption-helper';
import { DeviceInfoProps } from '@app/network/services/services.interface';

const IPayChangeCardPin = forwardRef(({ onSuccess, currentCard }: ChangeCardPinProps) => {
  const { colors } = useTheme();
  const styles = changeCardPinStyles();
  const localizationText = useLocalization();
  const [passcodeError, setPasscodeError] = useState(false);
  const [currentView, setCurrentView] = useState<ChangeCardPinViewTypes>(ChangeCardPinViewTypes.CurrentPin);
  const [newPin, setNewPin] = useState<string>('');
  const [clearPin, setClearPin] = useState<boolean>();
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const [apiError, setAPIError] = useState<string>('');
  const { appData } = useTypedSelector((state) => state.appDataReducer);

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
  


  const renderSpinner = useCallback((isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  }, []);
  

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const isExist = (checkStr: string | undefined) => checkStr || '';
  
  const resetPassCode = async (enteredCode:string) => {
    renderSpinner(true);
    try {
      const payload: resetPinCodeProp = {
        walletNumber,
        cardIndex: currentCard?.cardIndex,
        body:{
          cardPinCode: encryptData(
            isExist(appData?.encryptionData?.passwordEncryptionPrefix) + enteredCode,
            isExist(appData?.encryptionData?.passwordEncryptionKey),
          ) || '',
          deviceInfo: appData.deviceInfo as DeviceInfoProps,
        }
      };
      const apiResponse: any = await resetPinCode(payload);
      renderSpinner(false);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setClearPin((prev) => !prev);
          if (onSuccess) {
            onSuccess();
          }
          break;
        case apiResponse?.apiResponseNotOk:
          setPasscodeError(true);
          renderToast(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setPasscodeError(true);
          renderToast(apiResponse?.error);
          break;
        default:

          setPasscodeError(true);
          renderToast(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
      }

      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  }

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
          resetPassCode(enteredCode)
          
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
