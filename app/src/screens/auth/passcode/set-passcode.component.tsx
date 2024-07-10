import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayPageDescriptionText } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { scale, verticalScale } from 'react-native-size-matters';
import passcodeStyles from './set-passcode.style';
import IPayPasscode from '@app/components/organism/ipay-passcode/ipay-passcode.component';
import icons from '@app/assets/icons';

const SetPasscode = () => {
  const { colors } = useTheme();
  const styles = passcodeStyles(colors);
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
            heading={localizationText.createPasscode}
            text={localizationText.COMMON.ENTER_CODE_TO_ACCESS_APPLICATION}
          />
        </IPayView>
        <IPayView style={{ flex: 1 }}>
          <IPayPasscode data={constants.DIALER_DATA} />
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default SetPasscode;
