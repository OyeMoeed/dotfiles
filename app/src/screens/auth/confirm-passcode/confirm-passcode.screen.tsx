import { IPayIcon, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
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
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { spinnerVariant } from '@app/utilities/enums.util';
import icons from '@assets/icons';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import passcodeStyles from '../set-passcode/set-passcode.style';

const ConfirmPasscodeScreen: React.FC = ({ route }: any) => {
  const { passcode } = route.params;
  const { colors } = useTheme();
  const styles = passcodeStyles();
  const localizationText = useLocalization();
  const [passcodeError, setPasscodeError] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { showToast } = useToastContext();
  const dispatch = useTypedDispatch();
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const renderToast = (toastHeading: string, toastMsg: string) => {
    showToast({
      title: toastHeading,
      subTitle: apiError || toastMsg,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
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

  const isExist = (checkStr: string | undefined) => checkStr || '';

  const setNewPasscode = async (newCode: string) => {
    renderSpinner(true);
    try {
      const payload: SetPasscodeServiceProps = {
        passCode:
          encryptData(
            isExist(appData?.encryptionData?.passwordEncryptionPrefix) + newCode,
            isExist(appData?.encryptionData?.passwordEncryptionKey),
          ) || '',
        authentication: { transactionId: appData?.transactionId },
        deviceInfo: appData.deviceInfo as DeviceInfoProps,
        mobileNumber:
          encryptData(
            isExist(appData?.encryptionData?.passwordEncryptionPrefix) + isExist(appData?.mobileNumber),
            isExist(appData?.encryptionData?.passwordEncryptionKey),
          ) || '',
        poiNumber:
          encryptData(
            isExist(appData?.encryptionData?.passwordEncryptionPrefix) + isExist(appData?.poiNumber),
            isExist(appData?.encryptionData?.passwordEncryptionKey),
          ) || '',
      };

      const apiResponse: any = await setPasscode(payload, dispatch);
      if (apiResponse?.status?.type === 'SUCCESS') {
        dispatch(
          setAppData({
            isLinkedDevice: true,
          }),
        );
        navigate(screenNames.REGISTRATION_SUCCESSFUL);
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(localizationText.ERROR.PASSCODE_NOT_SET, localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const validatePasscode = (newCode: string) => {
    if (passcode && newCode && passcode !== newCode) {
      setPasscodeError(true);
      renderToast(localizationText.COMMON.INCORRECT_CODE, localizationText.CHANGE_PIN.ENSURE_YOU_WRITE);
    } else {
      dispatch(
        setAppData({
          passCode: newCode,
        }),
      );
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
      <>
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
      </>
    </IPaySafeAreaView>
  );
};

export default ConfirmPasscodeScreen;
