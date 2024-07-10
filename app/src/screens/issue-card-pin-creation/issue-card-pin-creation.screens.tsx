import images from '@app/assets/images';
import { IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';
import { forwardRef, useState } from 'react';
import { ChangeCardPinProps, ChangeCardPinViewTypes } from './issue-card-pin-creation.interface';
import changeCardPinStyles from './issue-card-pin-creation.style';

const IssueCardPinCreationScreen = forwardRef(({ onSuccess }: ChangeCardPinProps) => {
  const { colors } = useTheme();
  const styles = changeCardPinStyles(colors);
  const localizationText = useLocalization();
  const [passcodeError, setPasscodeError] = useState(false);
  const [currentView, setCurrentView] = useState<ChangeCardPinViewTypes>(ChangeCardPinViewTypes.NewPin);
  const [newPin, setNewPin] = useState<string>('');
  const [clearPin, setClearPin] = useState<boolean>();

  const getScreenTitle = (currentView: string) => {
    switch (currentView) {
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.VIRTUAL_CARD.CREATE_CARD_PIN_PIN;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.VIRTUAL_CARD.CONFIRM_CARD_PIN;
      default:
        return '';
    }
  };

  const getScreenDescription = (currentView: string) => {
    switch (currentView) {
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.VIRTUAL_CARD.FIRST_TIME_CODE;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.VIRTUAL_CARD.ENTER_PASSCODE_AGAIN;
      default:
        return '';
    }
  };

  const getErrorTitle = (currentView: string) => {
    switch (currentView) {
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.CHANGE_PIN.INVALID_PIN;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.CHANGE_PIN.PIN_NOT_MATCHING;
      default:
        return '';
    }
  };

  const getErrorDescription = (currentView: string) => {
    switch (currentView) {
      case ChangeCardPinViewTypes.NewPin:
        return localizationText.CHANGE_PIN.OLD_PIN;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        return localizationText.CHANGE_PIN.ENSURE_YOU_WRITE;
      default:
        return '';
    }
  };

  const { showToast } = useToastContext();

  const isPinMatched = (enteredCode: string) => enteredCode === newPin;

  const onEnterPassCode = (enteredCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (enteredCode.length !== 4) return;

    switch (currentView) {
      case ChangeCardPinViewTypes.NewPin:
        setNewPin(enteredCode);
        setCurrentView(ChangeCardPinViewTypes.ConfirmNewPin);
        setClearPin((prev) => !prev);

        break;
      case ChangeCardPinViewTypes.ConfirmNewPin:
        if (isPinMatched(enteredCode)) {
          setClearPin((prev) => !prev);
          onSuccess && onSuccess();
        } else {
          setPasscodeError(true);
          renderToast();
        }
        break;
      default:
        return '';
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
      <IPayImage image={images.securityCard} style={styles.lockIconView} />
      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText heading={getScreenTitle(currentView)} text={getScreenDescription(currentView)} />
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

export default IssueCardPinCreationScreen;
