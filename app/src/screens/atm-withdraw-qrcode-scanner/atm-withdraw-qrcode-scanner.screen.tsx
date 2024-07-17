import React, { useState } from 'react';

import icons from '@app/assets/icons';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import IPayQRCodeScannerComponent from '@app/components/organism/ipay-qrcode-scanner/ipay-qrcode-scanner.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import qrCodeScannerStyles from './atm-withdraw-qrcode-scanner.style';

import { IPayIcon, IPayPressable } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { goBack } from '@app/navigation/navigation-service.navigation';
import { alertVariant } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';

const ATMWithdrawQRCodeScannerScreen: React.FC = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();

  const [renderQRCodeScanner, setRenderQRCodeScanner] = useState(true);
  const [scannedCode, setScannerCode] = useState('');

  const styles = qrCodeScannerStyles();

  return (
    <IPaySafeAreaView style={styles.fill}>
      <IPayHeader
        title={localizationText.scan_qr_code}
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
            setRenderQRCodeScanner(false);
            setScannerCode(code);
          }}
        />
      ) : (
        <IPayAlert
          secondaryAction={{
            text: localizationText.go_back,
            onPress: goBack,
          }}
          primaryAction={{ text: localizationText.scane_again, onPress: () => setRenderQRCodeScanner(true) }}
          variant={alertVariant.DEFAULT}
          title={localizationText.code_scanned_successfully}
          message={scannedCode}
        />
      )}
    </IPaySafeAreaView>
  );
};

export default ATMWithdrawQRCodeScannerScreen;
