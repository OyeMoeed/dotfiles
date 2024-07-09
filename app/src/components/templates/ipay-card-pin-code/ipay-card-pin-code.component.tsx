import icons from '@app/assets/icons';
import { SecurityCard } from '@app/assets/svgs';
import { IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import cardPinCodeStyle from './ipay-card-pin-code.style';

const IPayCardPinCode: React.FC = () => {
  const [clearPin, setClearPin] = useState<boolean>();
  const [passcodeError, setPasscodeError] = useState(false);

  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = cardPinCodeStyle(colors);
  const { showToast } = useToastContext();

  const onVerifyPin = (enteredCode: string) => enteredCode === '1234';

  const onEnterPassCode = (enteredCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (enteredCode.length !== 4) return;

    if (onVerifyPin(enteredCode)) {
      setClearPin((prev) => !prev);
    } else {
      setPasscodeError(true);
      renderToast();
    }
  };
  const renderToast = () => {
    showToast({
      title: localizationText.CARDS.INCORRECT_CODE,
      subTitle: localizationText.CARDS.VERIFY_CODE_ACCURACY,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.securityIcon}>
        <SecurityCard />
      </IPayView>
      <IPayView style={styles.headingView}>
        <IPayTitle2Text text={localizationText.CARDS.ENTER_CARD_PIN_CODE} />
      </IPayView>
      <IPayView style={styles.pincodeViewContainer}>
        <IPayPasscode
          clearPin={clearPin}
          passcodeError={passcodeError}
          data={constants.DIALER_DATA}
          onEnterPassCode={onEnterPassCode}
          loginViaPasscode
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayCardPinCode;
