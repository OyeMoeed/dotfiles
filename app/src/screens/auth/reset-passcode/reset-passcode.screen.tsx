import icons from '@app/assets/icons';
import { BulkLock } from '@app/assets/svgs';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import colors from '@app/styles/colors.const';
import { useNavigation } from '@react-navigation/native';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import IPayResetPasscodeProps from './reset-passcode.interface';
import resetPasscodeStyles from './reset-passcode.styles';

const IPayResetPasscode = forwardRef<{}, IPayResetPasscodeProps>(({ onEnterPassCode, passcodeError }, ref) => {
  const styles = resetPasscodeStyles();
  const navigation = useNavigation();
  const localizationText = useLocalization();
  const { showToast } = useToastContext();

  useEffect(() => {
    setTopLevelNavigator(navigation);
  });

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg || localizationText.ERROR.API_ERROR_RESPONSE,
      subTitle: localizationText.CHANGE_PIN.PLEASE_ENSURE_PASSCODE,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      isBottomSheet: true,
    });
  };

  useImperativeHandle(ref, () => ({
    triggerToast: (toastMsg: string) => {
      renderToast(toastMsg);
    },
  }));

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <BulkLock />
      </IPayView>
      <IPayView style={styles.headingView}>
        <IPayPageDescriptionText heading="SETTINGS.CURRENT_PASSCODE" text="SETTINGS.ENTER_CURRENT_PASSCODE" />
      </IPayView>
      <IPayView style={styles.fill}>
        <IPayPasscode passcodeError={passcodeError} data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPayView>
  );
});

export default IPayResetPasscode;
