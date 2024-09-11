import images from '@app/assets/images';
import { IPayIcon, IPayImage, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import React, { useState } from 'react';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import useBiometricService from '@app/network/services/core/biometric/biometric-service';
import IPayCardPinCodeProps from './ipay-card-pin-code.interface';
import cardPinCodeStyle from './ipay-card-pin-code.style';

const IPayCardPinCode: React.FC<IPayCardPinCodeProps> = ({ testID, onEnterPassCode }) => {
  const pinCode = '1234'; // TODO update with saved pin
  const localizationText = useLocalization();
  const styles = cardPinCodeStyle();
  const { showToast } = useToastContext();
  const { colors } = useTheme();
  const [passcodeError, setPasscodeError] = useState<boolean>(false);
  const { handleFaceID } = useBiometricService();

  const renderErrorToast = () => {
    showToast({
      title: localizationText.CARDS.INCORRECT_CODE,
      subTitle: localizationText.CARDS.VERIFY_CODE_ACCURACY,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const onPressFaceID = async () => {
    const retrievedPasscode = await handleFaceID();

    if (retrievedPasscode) {
      // TODO: Authorize user
    }
  };

  return (
    <IPayView style={styles.container} testID={testID}>
      <IPayView style={styles.securityIconWrapper}>
        <IPayImage style={styles.securityIcon} image={images.securityCard} />
      </IPayView>
      <IPayView style={styles.headingView}>
        <IPayTitle2Text text={'CARDS.ENTER_CARD_PIN_CODE'} />
      </IPayView>
      <IPayView style={styles.pincodeViewContainer}>
        <IPayPasscode
          passcodeError={passcodeError}
          data={constants.DIALER_DATA}
          onEnterPassCode={(enteredCode) => {
            if (passcodeError) {
              setPasscodeError(false);
            }
            if (enteredCode.length === 4) {
              if (enteredCode === pinCode) {
                onEnterPassCode(enteredCode);
              } else {
                renderErrorToast();
                setPasscodeError(true);
              }
            }
          }}
          loginViaPasscode
          onPressFaceID={onPressFaceID}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayCardPinCode;
