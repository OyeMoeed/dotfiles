import { navigateAndReset } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useBiometricService from '@app/network/services/core/biometric/biometric-service';
import { DelinkPayload } from '@app/network/services/core/delink/delink-device.interface';
import deviceDelink from '@app/network/services/core/delink/delink.service';
import { getDeviceInfo } from '@app/network/utilities';
import clearSession from '@app/network/utilities/network-session-helper';
import { useTypedSelector } from '@app/store/store';

const useDelinkDevice = ({ shouldNavigate }: { shouldNavigate?: boolean }) => {
  const { resetBiometricConfig } = useBiometricService();
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const delinkDevice = async () => {
    const delinkReqBody = await getDeviceInfo();
    const payload: DelinkPayload = {
      delinkReq: delinkReqBody,
      walletNumber,
    };

    await deviceDelink(payload);
    resetBiometricConfig();

    if (shouldNavigate) {
      navigateAndReset(ScreenNames.DELINK_SUCCESS);
    }
    clearSession(true);
  };

  return { delinkDevice };
};

export default useDelinkDevice;
