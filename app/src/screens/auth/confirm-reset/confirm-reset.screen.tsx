import React, { forwardRef, useState } from 'react';
import {  IPayView } from '@app/components/atoms';
import {  IPayPageDescriptionText } from '@app/components/molecules';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import ConfirmPasscodeStyles from './confirm-reset.styles';
import { BulkLock } from '@app/assets/svgs';

const ConfirmPasscode = forwardRef((props, ref) => {
  const { closeBottomSheet } = props;
  const { colors } = useTheme();
  const styles = ConfirmPasscodeStyles(colors);
  const localizationText = useLocalization();
  const [passcode, setPasscode] = useState<string>('');

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length === 4) {
      setPasscode(newCode);
      closeBottomSheet();
      navigate(screenNames.RESET_SUCCESSFUL);
    }
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <BulkLock />
      </IPayView>
      <IPayView>
        <IPayPageDescriptionText heading={localizationText.confirmPasscode} text={localizationText.enterConfirm} />
      </IPayView>
      <IPayView style={styles.dialerView}>
        <IPayPasscode data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPayView>
  );
});

export default ConfirmPasscode;
