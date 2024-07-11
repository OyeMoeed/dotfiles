import { SecurityCard } from '@app/assets/svgs';
import { IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import React, { useState } from 'react';
import IPayCardPinCodeProps from './ipay-card-pin-code.interface';
import cardPinCodeStyle from './ipay-card-pin-code.style';

const IPayCardPinCode: React.FC<IPayCardPinCodeProps> = ({ testID, pinCode, renderErrorToast, onVerifyPin }) => {
  const [clearPin, setClearPin] = useState<boolean>();
  const [passcodeError, setPasscodeError] = useState(false);

  const localizationText = useLocalization();
  const styles = cardPinCodeStyle();

  const onEnterPassCode = (enteredCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (enteredCode.length !== 4) return;

    if (enteredCode === pinCode) {
      setClearPin((prev) => !prev);
      onVerifyPin();
    } else {
      setPasscodeError(true);
      renderErrorToast();
    }
  };

  return (
    <IPayView style={styles.container} testID={testID}>
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
