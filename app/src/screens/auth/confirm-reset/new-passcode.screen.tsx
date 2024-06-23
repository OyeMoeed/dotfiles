import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { IPayPasscode } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef, useState } from 'react';
import icons from '@app/assets/icons';
import newPasscodeStyles from './new-passcode.styles';
import { BulkLock } from '@app/assets/svgs';

const NewPasscode = forwardRef((props, ref) => {
  const { colors } = useTheme();
  const styles = newPasscodeStyles(colors);
  const localizationText = useLocalization();
  const [passcode, setPasscode] = useState<string>('');

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      setPasscode(newCode);
    }
    if (newCode.length == 4) props.changeView('ConfirmPasscode');
  };

  return (
   
      <IPayView style={styles.container}>
        <IPayView style={styles.lockIconView}>
        <BulkLock />
        </IPayView>
        <IPayView style={styles.headingView}>
          <IPayPageDescriptionText heading={localizationText.newPasscode} text={localizationText.enterNewPasscode} />
        </IPayView>
        <IPayView style={{ flex: 1 }}>
          <IPayPasscode data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
        </IPayView>
      </IPayView>

  );
});

export default NewPasscode;
