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
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef, useState } from 'react';
import ConfirmPasscodeStyles from './confirm-reset.styles';

const ConfirmPasscode = forwardRef((props, ref) => {
  const { closeBottomSheet } = props;
  const { colors } = useTheme();
  const styles = ConfirmPasscodeStyles(colors);
  const localizationText = useLocalization();
  const [passcode, setPasscode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      if (newCode === props?.newPasscode) {
        changePasscode(newCode);
      } else {
        setPasscodeError(true);
        renderToast(localizationText.PROFILE.PASSCODE_NOT_MATCHED);
      }
    }
  };

  const renderToast = (toastMsg: string) => {
    showToast({
      title: localizationText.COMMON.PASSCODE_IS_INCORRECT,
      subTitle: toastMsg,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const changePasscode = async (passCode: string) => {
    setIsLoading(true);
    try {
      const payload: ChangePasswordProps = {
        passCode,
        oldPassword: props?.currentPasscode,
        mobileNumber: props?.walletInfo?.userContactInfo?.mobileNumber,
        authentication: {
          transactionId: '',
        },
        deviceInfo: props?.appData.deviceInfo,
      };

      const apiResponse = await changePasscodeReq(payload);
      if (apiResponse.ok) {
        redirectToOtp();
      } else if (apiResponse?.apiResponseNotOk) {
        renderToast(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        renderToast(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const redirectToOtp = () => {
    console.log('REDIRE');
    closeBottomSheet();
    navigate(screenNames.RESET_SUCCESSFUL);
  };

  return (
    <IPayView style={styles.container}>
      {isLoading && <IPaySpinner />}
      <IPayView style={styles.lockIconView}>
        <BulkLock />
      </IPayView>
      <IPayView>
        <IPayPageDescriptionText heading={localizationText.SETTINGS.CONFIRM_PASSCODE} text={localizationText.SETTINGS.ENTER_CONFIRM} />
      </IPayView>
      <IPayView style={styles.dialerView}>
        <IPayPasscode passcodeError={passcodeError} data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} />
      </IPayView>
    </IPayView>
  );
});

export default ConfirmPasscode;
