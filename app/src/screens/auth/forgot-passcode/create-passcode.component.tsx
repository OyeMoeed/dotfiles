import { IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import passcodeStyles from '../set-passcode/set-passcode.style';
import { SetPasscodeComponentProps } from './forget-passcode.interface';

const SetPasscodeComponent: React.FC<SetPasscodeComponentProps> = ({ onCallback }) => {
  const { colors } = useTheme();
  const styles = passcodeStyles(colors);
  const localizationText = useLocalization();
  const [passcode, setPasscode] = useState<string>('');

  const onCodeFilled = (newCode: string) => {
    if (onCallback)
      onCallback({ nextComponent: constants.FORGET_PASSWORD_COMPONENTS.CONFIRM_PASSCODE, data: { passcode: newCode } });
  };

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      setPasscode(newCode);
      if (newCode.length === 4) onCodeFilled(newCode);
    }
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <icons.bulkLock width={scale(40)} height={verticalScale(40)} />
      </IPayView>
      <IPayView style={styles.forgetPasscodeheadingView}>
        <IPayPageDescriptionText
          heading={localizationText.CHANGE_PIN.CREATE_A_PASSCODE}
          text={localizationText.COMMON.ENTER_CODE_TO_ACCESS_APPLICATION}
        />
      </IPayView>
      <IPayPasscode data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
    </IPayView>
  );
};

export default SetPasscodeComponent;
