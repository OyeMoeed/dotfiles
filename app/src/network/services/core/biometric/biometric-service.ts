import useBiometrics from '@app/hooks/biometric/biometric.hook';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedSelector } from '@app/store/store';
import { EncryptedKey, EncryptedService } from '@app/utilities/enum/encrypted-keys.enum';
import { deleteData, isDataStored, retrieveData, storeData } from '@app/utilities/keychain.utils';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

const useBiometricService = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { checkBiometrics } = useBiometrics();
  const { passCode, biomatricEnabled } = useTypedSelector((state) => state.appDataReducer.appData);

  const handleStorePasscode = async () => {
    await storeData(EncryptedService.AUTH, EncryptedKey.PASSCODE, passCode?.toString());
  };

  const handleRemovePasscode = async () => {
    await deleteData(EncryptedService.AUTH);
  };

  const savePasscodeState = (newCode: string) => {
    dispatch(
      setAppData({
        passCode: newCode,
      }),
    );
    if (biomatricEnabled) {
      handleStorePasscode();
    }
  };

  const isDataStore = async () => isDataStored(EncryptedService.AUTH, EncryptedKey.PASSCODE);

  const handleRetrievePasscode = async (): Promise<string | undefined> => {
    const retrievedPasscode = await retrieveData(EncryptedService.AUTH, EncryptedKey.PASSCODE);

    if (retrievedPasscode) {
      return retrievedPasscode;
    }
    return undefined;
  };

  const handleFaceID = async () => {
    const isPasscode = await isDataStore();
    if (!biomatricEnabled || !isPasscode) {
      return Alert.alert(t('PERMISSIONS.OOPS'), t('PERMISSIONS.ENABLE_BIOMETRICS_ERROR'));
    }
    const biometricKeys = await checkBiometrics();
    if (biometricKeys) {
      return handleRetrievePasscode();
    }
    return null;
  };

  const handleSetupBiomatric = async () => {
    const biometricKeys = await checkBiometrics();

    if (biometricKeys) {
      try {
        await new Promise<void>((resolve) => {
          dispatch(setAppData({ biomatricEnabled: true }));
          handleStorePasscode();
          resolve();
        });
        resetNavigation(ScreenNames.LOGIN_VIA_PASSCODE);
      } catch (error) {
        //
      }
    }
  };

  const handleSetupBiomatricForSettings = async (): Promise<boolean> => {
    const biometricKeys = await checkBiometrics();

    if (biometricKeys) {
      try {
        await new Promise<void>((resolve) => {
          resolve();
        });
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  };

  const resetBiometricConfig = () => {
    dispatch(setAppData({ biomatricEnabled: false }));
    handleRemovePasscode();
  };

  return {
    handleStorePasscode,
    handleSetupBiomatric,
    handleSetupBiomatricForSettings,
    handleRemovePasscode,
    handleFaceID,
    savePasscodeState,
    isDataStore,
    resetBiometricConfig,
  };
};

export default useBiometricService;
