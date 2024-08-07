import { IPayView } from '@app/components/atoms';
import { IPayHeader, IPayPageDescriptionText } from '@app/components/molecules';
import { IPayPasscode } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';
import { scale, verticalScale } from 'react-native-size-matters';
import passcodeStyles from './set-passcode.style';

const SetPasscode = () => {
  const { colors } = useTheme();
  const styles = passcodeStyles(colors);
  const localizationText = useLocalization();

  const handleDigitPress = (newCode: string) => {
    navigate(screenNames.CONFIRM_PASSCODE, { passcode: newCode });
  };

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      if (newCode.length === 4) {
        handleDigitPress(newCode);
      }
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn languageBtn />
      <IPayView style={styles.container}>
        <IPayView style={styles.lockIconView}>
          <icons.bulkLock width={scale(40)} height={verticalScale(40)} />
        </IPayView>
        <IPayView style={styles.headingView}>
          <IPayPageDescriptionText
            heading={localizationText.CHANGE_PIN.CREATE_A_PASSCODE}
            text={localizationText.REGISTRATION.ENTER_CODE_TO_ACCESS_APPLICATION}
          />
        </IPayView>
        <IPayPasscode data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default SetPasscode;
