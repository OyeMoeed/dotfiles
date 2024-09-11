import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayPageDescriptionText } from '@app/components/molecules';
import IPayPasscode from '@app/components/organism/ipay-passcode/ipay-passcode.component';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { scale, verticalScale } from 'react-native-size-matters';
import passcodeStyles from './set-passcode.style';

const SetPasscode = () => {
  const styles = passcodeStyles();
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn languageBtn />
      <IPayView style={styles.container}>
        <IPayView style={styles.lockIconView}>
          <IPayIcon icon={icons.LOCK} width={scale(40)} height={verticalScale(40)} />
        </IPayView>
        <IPayView style={styles.headingView}>
          <IPayPageDescriptionText
            heading={localizationText.CHANGE_PIN.CREATE_A_PASSCODE}
            text={'COMMON.ENTER_CODE_TO_ACCESS_APPLICATION'}
          />
        </IPayView>
        <IPayView style={styles.flex1}>
          <IPayPasscode data={constants.DIALER_DATA} />
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default SetPasscode;
