// useSaveQRCode.ts

import icons from '@app/assets/icons';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ALINMA_REFERENCE_NUM } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayIcon } from '@components/atoms';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useRef } from 'react';
import RNFS from 'react-native-fs';
import IQrData from './use-save-qrcode.interface';
import walletStyles from './wallet.style';

const useSaveQRCode = () => {
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { showToast } = useToastContext();
  const qrRef = useRef<any>(null);
  const { colors } = useTheme();
  const localization = useLocalization();
  // Define the QR data
  const qrDataObject: IQrData = {
    name: userInfo?.fullName,
    IBAN: userInfo?.viban,
    contact: userInfo?.mobileNumber,
    reference: ALINMA_REFERENCE_NUM,
  };
  const qrData = JSON.stringify(qrDataObject);

  const styles = walletStyles(colors);

  const renderToast = (title: string, icon: string) => {
    showToast({
      title,
      leftIcon: <IPayIcon icon={icon} size={18} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainerStyle,
    });
  };

  // Save QR code to disk
  const saveQrToDisk = async (): Promise<void> => {
    qrRef.current?.toDataURL(async (data: string) => {
      try {
        const filePath = `${RNFS.CachesDirectoryPath}/QRCode.png`;
        // // Save the QR code data to a file
        await RNFS.writeFile(filePath, data, 'base64');

        // Save the file to the gallery
        await CameraRoll.save(filePath, { type: 'photo' });

        renderToast(localization.HOME.QR_TO_GALLERY, icons.save);
      } catch (error) {
        // TODO : implement dynatrace
      }
    });
  };

  return {
    qrRef,
    saveQrToDisk,
    qrData,
  };
};

export default useSaveQRCode;
