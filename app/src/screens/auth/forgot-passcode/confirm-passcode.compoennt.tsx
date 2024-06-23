import { IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import icons from '@assets/icons';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import passcodeStyles from '../set-passcode/set-passcode.style';
import { SetPasscodeComponentProps } from './forget-passcode.interface';

const ConfirmPasscodeComponent: React.FC<SetPasscodeComponentProps> = ({ passcode, passcodeReacted }) => {
  const styles = passcodeStyles();
  const localizationText = useLocalization();
  const [confirmPasscode, setConfirmPasscode] = useState<string>('');
  const [passcodeError, setPassCodeError] = useState<boolean>(false);

  const handleDigitPress = (newCode: string) => {
    if (passcode && newCode && passcode !== newCode) {
      setPassCodeError(true);
    } else if (passcodeReacted) passcodeReacted();
  };

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      if (passcodeError) setPassCodeError(false);
      setConfirmPasscode(newCode);
      if (newCode.length === 4) handleDigitPress(newCode);
    }
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <icons.bulkLock width={scale(40)} height={verticalScale(40)} />
      </IPayView>

      <IPayView style={styles.forgetPasscodeheadingView}>
        <IPayPageDescriptionText
          heading={localizationText.confirm_passcode}
          text={localizationText.enter_passcode_again}
        />
      </IPayView>
      <IPayPasscode data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} passcodeError={passcodeError} />
    </IPayView>
  );
};

export default ConfirmPasscodeComponent;
