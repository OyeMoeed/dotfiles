import icons from '@app/assets/icons';
import { BulkLock } from '@app/assets/svgs';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef, useState } from 'react';
import newPasscodeStyles from './new-passcode.styles';

const NewPasscode = forwardRef((props, ref) => {
  const { colors } = useTheme();
  const styles = newPasscodeStyles(colors);
  const localizationText = useLocalization();
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState(false);
  const { showToast } = useToastContext();

  const onEnterPassCode = (newCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (newCode.length <= 4) {
      setPasscode(newCode);
    }
    if (newCode.length === 4) {
      if (newCode === props?.currentCode) {
        setPasscodeError(true);
        renderToast(localizationText.new_passcode_should_not_match_old_passcode);
      } else {
        props.changeView({ newCode, nextComponent: 'ConfirmPasscode' });
      }
    }
  };

  const renderToast = (toastMsg: string) => {
    showToast({
      title: localizationText.passcode_is_incorrect,
      subTitle: toastMsg,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
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
        <IPayPasscode passcodeError={passcodeError} data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPayView>
  );
});

export default NewPasscode;
