import icons from '@assets/icons/index';
import useTheme from '@app/styles/hooks/theme.hook';
import constants from '@app/constants/constants';
import { IPayPasscode } from '@app/components/organism';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import { forwardRef, useState } from 'react';
import { IPayPageDescriptionText } from '@app/components/molecules';
import images from '@app/assets/images';
import { useTranslation } from 'react-i18next';
import createCardPinStyles from './create-card-pin.style';
import { CreateCardPinViewTypes, CreateCardPinProps } from './create-card-pin.interface';

const IPayCreateCardPin = forwardRef(({ onSuccess }: CreateCardPinProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = createCardPinStyles();
  const [passcodeError, setPasscodeError] = useState(false);
  const [currentView, setCurrentView] = useState<CreateCardPinViewTypes>(CreateCardPinViewTypes.NewPin);
  const [newPin, setNewPin] = useState<string>('');
  const [clearPin, setClearPin] = useState<boolean>();

  const getTitle = () => {
    switch (currentView) {
      case CreateCardPinViewTypes.NewPin:
        return t('VIRTUAL_CARD.CREATE_CARD_PIN_PIN');
      case CreateCardPinViewTypes.ConfirmNewPin:
        return t('CHANGE_PIN.CONFIRM_NEW_PIN');
      default:
        return '';
    }
  };

  const getDescription = () => {
    switch (currentView) {
      case CreateCardPinViewTypes.NewPin:
        return t('CHANGE_PIN.YOU_WILL_NEED_TO');
      case CreateCardPinViewTypes.ConfirmNewPin:
        return t('CHANGE_PIN.ENTER_PASS_AGAIN');
      default:
        return '';
    }
  };

  const getErrorTitle = () => {
    switch (currentView) {
      case CreateCardPinViewTypes.NewPin:
        return t('CHANGE_PIN.INVALID_PIN');
      case CreateCardPinViewTypes.ConfirmNewPin:
        return t('CHANGE_PIN.PIN_NOT_MATCHING');
      default:
        return '';
    }
  };

  const getErrorDescription = () => {
    switch (currentView) {
      case CreateCardPinViewTypes.NewPin:
        return t('CHANGE_PIN.OLD_PIN');
      case CreateCardPinViewTypes.ConfirmNewPin:
        return t('CHANGE_PIN.ENSURE_YOU_WRITE');
      default:
        return '';
    }
  };

  const { showToast } = useToastContext();

  const checkIfPinNotOldPin = (enteredCode: string) => enteredCode !== '1234';

  const isPinMatched = (enteredCode: string) => enteredCode === newPin;

  const renderToast = () => {
    showToast({
      title: getErrorTitle(),
      subTitle: getErrorDescription(),
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const onEnterPassCode = (enteredCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (enteredCode.length !== 4) return;

    switch (currentView) {
      case CreateCardPinViewTypes.NewPin:
        if (checkIfPinNotOldPin(enteredCode)) {
          setNewPin(enteredCode);
          setCurrentView(CreateCardPinViewTypes.ConfirmNewPin);
          setClearPin((prev) => !prev);
        } else {
          setPasscodeError(true);
          renderToast();
        }
        break;
      case CreateCardPinViewTypes.ConfirmNewPin:
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
        <IPayImage image={images.securityCard} style={styles.lockIconView} />
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

export default IPayCreateCardPin;
