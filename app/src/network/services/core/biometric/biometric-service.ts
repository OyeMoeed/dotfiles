import useBiometrics from '@app/hooks/biometric/biometric.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedSelector } from '@app/store/store';
import { EncryptedKey, EncryptedService } from '@app/utilities/enum/encrypted-keys.enum';
import { deleteData, isDataStored, retrieveData, storeData } from '@app/utilities/keychain.utils';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

const useBiometricService = () => {
  const dispatch = useDispatch();
  const { checkBiometrics } = useBiometrics();
  const localizationText = useLocalization();
  const { passCode, biomatricEnabled } = useTypedSelector((state) => state.appDataReducer.appData);
  //function to store passcode
  const handleStorePasscode = async () => {
    await storeData(EncryptedService.AUTH, EncryptedKey.PASSCODE, passCode?.toString());
  };
  //function to remove passcode
  const handleRemovePasscode = async () => {
    await deleteData(EncryptedService.AUTH);
  };
  //save passcode to global redux state
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

  //cehck passcode is stored or not
  const isDataStore = async () => {
    return await isDataStored(EncryptedService.AUTH, EncryptedKey.PASSCODE);
  };
  //function to get passcode

  const handleRetrievePasscode = async (): Promise<string | undefined> => {
    const retrievedPasscode = await retrieveData(EncryptedService.AUTH, EncryptedKey.PASSCODE);

    if (retrievedPasscode) {
      return retrievedPasscode;
    }
    return undefined;
  };

  // if user has set face id we wants to login with face ID
  const handleFaceID = async () => {
    const isPasscode = await isDataStore();

    if (!biomatricEnabled || !isPasscode) {
      return Alert.alert(localizationText.PERMISSIONS.OOPS, localizationText.PERMISSIONS.ENABLE_BIOMETRICS_ERROR);
    } else {
      const biometricKeys = await checkBiometrics();
      if (biometricKeys) {
        return handleRetrievePasscode();
      }
    }
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
      } catch (error) {}
    }
  };

  return {
    handleStorePasscode,
    handleSetupBiomatric,
    handleRemovePasscode,
    handleFaceID,
    savePasscodeState,
  };
};

export default useBiometricService;
