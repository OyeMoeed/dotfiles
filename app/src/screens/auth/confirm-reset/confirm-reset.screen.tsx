import icons from '@app/assets/icons';
import { BulkLock } from '@app/assets/svgs';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useBiometricService from '@app/network/services/core/biometric/biometric-service';
import { ChangePasswordProps } from '@app/network/services/core/change-passcode/change-passcode.interface';
import changePasscodeReq from '@app/network/services/core/change-passcode/change-passcode.service';
import { encryptData } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { spinnerVariant } from '@app/utilities/enums.util';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmPasscodeStyles from './confirm-reset.styles';

const ConfirmPasscode = forwardRef((props) => {
  const { closeBottomSheet } = props;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = ConfirmPasscodeStyles();
  const localizationText = useLocalization();
  const [passcodeError, setPasscodeError] = useState(false);
  const { showToast } = useToastContext();
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { mobileNumber, walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { savePasscodeState, resetBiometricConfig } = useBiometricService();
  const renderToast = (toastMsg: string) => {
    showToast({
      title: t('COMMON.PASSCODE_DOES_NOT_MATCH'),
      subTitle: toastMsg,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const renderSpinner = (isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: false,
      });
    } else {
      hideSpinner();
    }
  };

  const redirectToOtp = () => {
    closeBottomSheet();
    navigate(screenNames.RESET_SUCCESSFUL);
  };

  const changePasscode = async (passCode: string) => {
    renderSpinner(true);

    const payload: ChangePasswordProps = {
      body: {
        passCode:
          encryptData(
            `${appData?.encryptionData?.passwordEncryptionPrefix}${passCode}`,
            appData?.encryptionData?.passwordEncryptionKey as string,
          ) || '',
        oldPassword:
          encryptData(
            `${appData?.encryptionData?.passwordEncryptionPrefix}${props?.currentPasscode}`,
            appData?.encryptionData?.passwordEncryptionKey as string,
          ) || '',
        mobileNumber:
          encryptData(
            `${appData?.encryptionData?.passwordEncryptionPrefix}${mobileNumber}`,
            appData?.encryptionData?.passwordEncryptionKey as string,
          ) || '',
        authentication: {
          transactionId: appData?.transactionId,
        },
        deviceInfo: appData?.deviceInfo,
      },
      walletNumber,
    };

    const apiResponse: any = await changePasscodeReq(payload);
    if (apiResponse?.status?.type === 'SUCCESS') {
      resetBiometricConfig();
      savePasscodeState(passCode);
      redirectToOtp();
    }
    renderSpinner(false);
  };

  const onEnterPassCode = (newCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (newCode.length === 4) {
      if (newCode === props?.newPasscode) {
        changePasscode(newCode);
      } else {
        setPasscodeError(true);
        renderToast(localizationText.COMMON.PLEASE_ENTER_AGAIN);
      }
    }
  };

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.lockIconView}>
        <BulkLock />
      </IPayView>
      <IPayView>
        <IPayPageDescriptionText heading="SETTINGS.CONFIRM_PASSCODE" text="SETTINGS.ENTER_CONFIRM" />
      </IPayView>
      <IPayView style={styles.dialerView}>
        <IPayPasscode passcodeError={passcodeError} data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPayView>
  );
});

export default ConfirmPasscode;
