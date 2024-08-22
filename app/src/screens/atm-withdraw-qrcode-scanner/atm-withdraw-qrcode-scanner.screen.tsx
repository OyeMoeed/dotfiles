import React, { useState } from 'react';

import icons from '@app/assets/icons';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import IPayQRCodeScannerComponent from '@app/components/organism/ipay-qrcode-scanner/ipay-qrcode-scanner.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import qrCodeScannerStyles from './atm-withdraw-qrcode-scanner.style';

import { IPayIcon, IPayPressable } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { goBack, navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { alertVariant } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';

const ATMWithdrawQRCodeScannerScreen: React.FC = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();

  const [renderQRCodeScanner, setRenderQRCodeScanner] = useState(true);
  const [scannedCode, setScannedCode] = useState('');

  const styles = qrCodeScannerStyles();

  const goBackQr = () => {
    setRenderQRCodeScanner(false);
    goBack();
  };

  return (
    <IPaySafeAreaView style={styles.fill}>
      <IPayHeader
        title={localizationText.PERMISSIONS.SCAN_QR_CODE}
        backBtn
        applyFlex
        rightComponent={
          <IPayPressable onPress={goBack}>
            <IPayIcon icon={icons.CLOSE_SQUARE} size={20} color={colors.primary.primary500} />
          </IPayPressable>
        }
      />
      {renderQRCodeScanner ? (
        <IPayQRCodeScannerComponent
          testID="qrcode-component"
          onRead={(code) => {
            navigate(ScreenNames.ATM_WITHDRAW_SUCCESSFUL), setScannedCode(code);
          }}
        />
      ) : (
        <IPayAlert
          secondaryAction={{
            text: localizationText.COMMON.GO_BACK,
            onPress: goBackQr,
          }}
          primaryAction={{ text: localizationText.COMMON.SCAN_AGAIN, onPress: () => setRenderQRCodeScanner(true) }}
          variant={alertVariant.DEFAULT}
          title={localizationText.ATM.CODE_SCANNED_SUCCESSFULLY}
          message={scannedCode}
        />
      )}
    </IPaySafeAreaView>
  );
};

export default ATMWithdrawQRCodeScannerScreen;
