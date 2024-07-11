import icons from '@app/assets/icons';
import { SecurityCard } from '@app/assets/svgs';
import { IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import IPayCardPinCodeProps from './ipay-card-pin-code.interface';
import cardPinCodeStyle from './ipay-card-pin-code.style';

const IPayCardPinCode: React.FC<IPayCardPinCodeProps> = ({ testID }) => {
  const pinCode = '1234'; // TODO update with saved pin
  const [clearPin, setClearPin] = useState<boolean>();
  const [passcodeError, setPasscodeError] = useState(false);

  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = cardPinCodeStyle();
  const { showToast } = useToastContext();

  const renderErrorToast = () => {
    showToast({
      title: localizationText.CARDS.INCORRECT_CODE,
      subTitle: localizationText.CARDS.VERIFY_CODE_ACCURACY,
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

    if (enteredCode === pinCode) {
      setClearPin((prev) => !prev);
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
