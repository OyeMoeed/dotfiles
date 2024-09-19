import icons from '@app/assets/icons';
import { BulkLock } from '@app/assets/svgs';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import { PasscodeTypes } from '@app/screens/settings/settings.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import newPasscodeStyles from './new-passcode.styles';

const NewPasscode = forwardRef((props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = newPasscodeStyles();
  const [passcodeError, setPasscodeError] = useState(false);
  const { showToast } = useToastContext();

  const renderToast = (toastMsg: string) => {
    showToast({
      title: t('COMMON.TRY_NEW_PASSCODE'),
      subTitle: toastMsg,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const onEnterPassCode = (newCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (newCode.length === 4) {
      if (newCode === props?.currentCode) {
        setPasscodeError(true);
        renderToast(t('CHANGE_PIN.MATCH_NEW_OLD_PASSCODE'));
      } else {
        props.changeView({ newCode, nextComponent: PasscodeTypes.ConfirmPasscode });
      }
    }
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <BulkLock />
      </IPayView>
      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText heading="REGISTRATION.NEW_PASSCODE" text="COMMON.ENTER_CODE_TO_ACCESS_APPLICATION" />
      </IPayView>
      <IPayView style={styles.fill}>
        <IPayPasscode passcodeError={passcodeError} data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPayView>
  );
});

export default NewPasscode;
