import { IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { IPayPasscode } from '@app/components/organism';
import { forwardRef, useEffect, useState } from 'react';

import { BulkLock } from '@app/assets/svgs';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import { useNavigation } from '@react-navigation/native';
import resetPasscodeStyles from './reset-passcode.styles';

const ResetPasscode = forwardRef((props) => {
  const styles = resetPasscodeStyles();
  const navigation = useNavigation();
  const localizationText = useLocalization();
  const [passcodeError, setPasscodeError] = useState(false);

  useEffect(() => {
    setTopLevelNavigator(navigation);
  });
  const onEnterPassCode = (currentCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (currentCode.length === 4) {
      props.changeView({ currentCode, nextComponent: 'NewPasscode' });
    }
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <BulkLock />
      </IPayView>
      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText
          heading={localizationText.SETTINGS.CURRENT_PASSCODE}
          text={localizationText.SETTINGS.ENTER_CURRENT_PASSCODE}
        />
      </IPayView>
      <IPayView style={styles.fill}>
        <IPayPasscode passcodeError={passcodeError} data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPayView>
  );
});

export default ResetPasscode;
