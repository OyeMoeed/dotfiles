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
import { encryptVariable } from '@app/network/utilities/encryption-helper';
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
  const [confirmPasscode, setConfirmPasscode] = useState<string>('');
  const [passcodeError, setPassCodeError] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { userInfo } = useTypedSelector((state) => state.userInfoReducer);
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

  const setNewPasscode = async () => {
    setIsLoading(true);
    try {
      const payload: SetPasscodeServiceProps = {
        passCode: encryptVariable({
          veriable: confirmPasscode,
          encryptionKey: appData?.encryptionData?.passwordEncryptionKey,
          encryptionPrefix: appData?.encryptVariable?.passwordEncryptionPrefix,
        }),
        authentication: { transactionId: appData?.transactionId },
        transactionId: appData?.transactionId,
        deviceInfo: appData.deviceInfo,
        mobileNumber: encryptVariable({
          veriable: userInfo?.mobileNumber,
          encryptionKey: appData?.encryptionData?.passwordEncryptionKey,
          encryptionPrefix: appData?.encryptVariable?.encryptionPrefix,
        }),
        poiNumber: encryptVariable({
          veriable: userInfo?.poiNumber,
          encryptionKey: appData?.encryptionData?.passwordEncryptionKey,
          encryptionPrefix: appData?.encryptVariable?.encryptionPrefix,
        }),
      };

      const apiResponse = await setPasscode(payload, dispatch);
      if (apiResponse?.ok) {
        navigate(screenNames.REGISTRATION_SUCCESSFUL);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.api_response_error);
      } else {
        setAPIError(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAPIError(error?.message || localizationText.something_went_wrong);
      renderToast(localizationText.api_request_failed, error?.message || localizationText.something_went_wrong);
    }
  };

  const validatePasscode = (newCode: string) => {
    if (passcode && newCode && passcode !== newCode) {
      setPassCodeError(true);
      renderToast(localizationText.incorrect_code, localizationText.ensure_you_write);
    } else {
      setNewPasscode();
    }
  };

  const onEnterPassCode = (newCode: string) => {
    if (newCode.length <= 4) {
      if (passcodeError) setPassCodeError(false);
      setConfirmPasscode(newCode);
      if (newCode.length === 4) validatePasscode(newCode);
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn languageBtn />
      {isLoading && <IPaySpinner />}
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
