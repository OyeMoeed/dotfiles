import icons from '@app/assets/icons';
import { BulkLock } from '@app/assets/svgs';
import { IPayIcon, IPaySpinner, IPayView } from '@app/components/atoms';
import { IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { ChangePasswordProps } from '@app/network/services/core/change-passcode/change-passcode.interface';
import changePasscodeReq from '@app/network/services/core/change-passcode/change-passcode.service';
import { encryptData } from '@app/network/utilities/encryption-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef, useState } from 'react';
import ConfirmPasscodeStyles from './confirm-reset.styles';

const ConfirmPasscode = forwardRef((props) => {
  const { closeBottomSheet } = props;
  const { colors } = useTheme();
  const styles = ConfirmPasscodeStyles(colors);
  const localizationText = useLocalization();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passcodeError, setPasscodeError] = useState(false);
  const { showToast } = useToastContext();
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { mobileNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: localizationText.COMMON.PASSCODE_IS_INCORRECT,
      subTitle: toastMsg,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const redirectToOtp = () => {
    closeBottomSheet();
    navigate(screenNames.RESET_SUCCESSFUL);
  };

  const changePasscode = async (passCode: string) => {
    setIsLoading(true);
    try {
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
        redirectToOtp();
      } else if (apiResponse?.apiResponseNotOk) {
        renderToast(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        renderToast(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
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
        renderToast(localizationText.PROFILE.PASSCODE_NOT_MATCHED);
      }
    }
  };

  return (
    <IPayView style={styles.container}>
      {isLoading && <IPaySpinner />}
      <IPayView style={styles.lockIconView}>
        <BulkLock />
      </IPayView>
      <IPayView>
        <IPayPageDescriptionText
          heading={localizationText.SETTINGS.CONFIRM_PASSCODE}
          text={localizationText.SETTINGS.ENTER_CONFIRM}
        />
      </IPayView>
      <IPayView style={styles.dialerView}>
        <IPayPasscode passcodeError={passcodeError} data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPayView>
  );
});

export default ConfirmPasscode;
