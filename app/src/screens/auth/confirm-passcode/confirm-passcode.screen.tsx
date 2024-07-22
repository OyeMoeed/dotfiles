import { IPayIcon, IPaySpinner, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayPageDescriptionText } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayPasscode } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { SetPasscodeServiceProps } from '@app/network/services/core/set-passcode/set-passcode.interface';
import setPasscode from '@app/network/services/core/set-passcode/set-passcode.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { encryptData } from '@app/network/utilities/encryption-helper';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import passcodeStyles from '../set-passcode/set-passcode.style';

const ConfirmPasscode: React.FC = ({ route }: any) => {
  const { passcode } = route.params;
  const { colors } = useTheme();
  const styles = passcodeStyles(colors);
  const localizationText = useLocalization();
  const [passcodeError, setPasscodeError] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { showToast } = useToastContext();
  const dispatch = useTypedDispatch();

  const renderToast = (toastHeading: string, toastMsg: string) => {
    showToast({
      title: toastHeading || localizationText.api_request_failed,
      subTitle: apiError || toastMsg,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const setNewPasscode = async (newCode: string) => {
    setIsLoading(true);
    try {
      const payload: SetPasscodeServiceProps = {
        passCode: encryptData(
          appData?.encryptionData?.passwordEncryptionPrefix + newCode,
          appData?.encryptionData?.passwordEncryptionKey,
        ) as string,
        authentication: { transactionId: appData?.transactionId },
        transactionId: appData?.transactionId,
        deviceInfo: appData.deviceInfo as DeviceInfoProps,
        mobileNumber: encryptData(
          appData?.encryptionData?.passwordEncryptionPrefix + appData?.mobileNumber,
          appData?.encryptionData?.passwordEncryptionKey,
        ) as string,
        poiNumber: encryptData(
          appData?.encryptionData?.passwordEncryptionPrefix + appData?.poiNumber,
          appData?.encryptionData?.passwordEncryptionKey,
        ) as string,
      };

      const apiResponse = await setPasscode(payload, dispatch);
      if (apiResponse.status.type == 'SUCCESS') {
        navigate(screenNames.REGISTRATION_SUCCESSFUL);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(localizationText.api_request_failed, error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const validatePasscode = (newCode: string) => {
    if (passcode && newCode && passcode !== newCode) {
      setPassCodeError(true);
      renderToast(localizationText.COMMON.INCORRECT_CODE, localizationText.CHANGE_PIN.ENSURE_YOU_WRITE);
    } else {
      setNewPasscode(newCode);
    }
  };

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      if (passcodeError) setPasscodeError(false);
      if (newCode.length === 4) validatePasscode(newCode);
    }
  };

  return (
    <IPaySafeAreaView>
      {isLoading && <IPaySpinner hasBackgroundColor={false} />}
      <IPayHeader backBtn languageBtn />
      <IPayView style={styles.container}>
        <IPayView style={styles.lockIconView}>
          <icons.bulkLock width={scale(40)} height={verticalScale(40)} />
        </IPayView>

        <IPayView style={styles.headingView}>
          <IPayPageDescriptionText
            heading={localizationText.REGISTRATION.CONFIRM_PASSCODE}
            text={localizationText.REGISTRATION.ENTER_PASSCODE_AGAIN}
          />
        </IPayView>
        <IPayPasscode data={constants.DIALER_DATA} onEnterPassCode={onEnterPassCode} passcodeError={passcodeError} />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default ConfirmPasscode;
