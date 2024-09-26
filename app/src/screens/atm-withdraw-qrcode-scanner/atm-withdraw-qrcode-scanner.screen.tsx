import React, { useState } from 'react';

import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import IPayQRCodeScannerComponent from '@app/components/organism/ipay-qrcode-scanner/ipay-qrcode-scanner.component';
import { goBack, navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import atmWithdrawalConfirm from '@app/network/services/cards-management/atm-cash-withdrawal/atm-cash-withdrawal-confirm/atm-cash-withdrawal-confirm.service';
import getAtmWithdrawalFees from '@app/network/services/cards-management/atm-cash-withdrawal/atm-cash-withdrawal-fees/atm-cash-withdrawal-fees.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { alertVariant } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { ATMWithdrawQRCodeScannerScreenProps } from './atm-withdraw-qrcode-scanner.interface';
import qrCodeScannerStyles from './atm-withdraw-qrcode-scanner.style';
import { Crc } from './crc.util';

const ATMWithdrawQRCodeScannerScreen: React.FC<ATMWithdrawQRCodeScannerScreenProps> = ({ route }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [renderQRCodeScanner, setRenderQRCodeScanner] = useState(true);
  const [scannedCode, setScannedCode] = useState('');
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);
  const { showToast } = useToastContext();

  const styles = qrCodeScannerStyles();

  const onReadQrCodeFaild = () => {
    showToast({
      title: t('ATM.SCAN_UNSUCCESSFUL'),
      borderColor: colors.error.error25,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
    goBack();
  };

  const onReadQrCode = async (code: string) => {
    setScannedCode(code);
    const crc = new Crc();
    crc.scanData.scanStringData(code);

    const terminal = crc?.scanData?.scannedData?.ID;
    const feesApiResponse = await getAtmWithdrawalFees(walletNumber as string, route?.params?.amount);

    if (feesApiResponse?.status?.type === 'SUCCESS') {
      const confirmApiResponse = await atmWithdrawalConfirm(walletNumber as string, {
        amount: route?.params?.amount,
        terminal,
        vatAmount: feesApiResponse?.response?.vatAmount as string,
        feeAmount: feesApiResponse?.response?.feeAmount as string,
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      });

      if (route?.params?.setTopUpAmount != null) {
        route?.params?.setTopUpAmount('0');
      }

      if (confirmApiResponse?.status?.type === 'SUCCESS') {
        navigate(ScreenNames.ATM_WITHDRAW_SUCCESSFUL, {
          amount: route?.params?.amount,
          referenceNumber: confirmApiResponse?.response?.referenceNumber,
        });
      } else {
        goBack();
      }

      return;
    }

    onReadQrCodeFaild();
  };

  const goBackQr = () => {};

  return (
    <IPaySafeAreaView style={styles.fill}>
      <IPayHeader
        title="PERMISSIONS.SCAN_QR_CODE"
        backBtn
        applyFlex
        rightComponent={
          <IPayPressable onPress={goBack}>
            <IPayIcon icon={icons.CLOSE_SQUARE} size={20} color={colors.primary.primary500} />
          </IPayPressable>
        }
      />
      {renderQRCodeScanner ? (
        <IPayQRCodeScannerComponent testID="qrcode-component" onRead={(code) => onReadQrCode(code)} />
      ) : (
        <IPayAlert
          secondaryAction={{
            text: t('COMMON.GO_BACK'),
            onPress: goBackQr,
          }}
          primaryAction={{ text: t('COMMON.SCAN_AGAIN'), onPress: () => setRenderQRCodeScanner(true) }}
          variant={alertVariant.DEFAULT}
          title="ATM.CODE_SCANNED_SUCCESSFULLY"
          message={scannedCode}
        />
      )}
    </IPaySafeAreaView>
  );
};

export default ATMWithdrawQRCodeScannerScreen;
