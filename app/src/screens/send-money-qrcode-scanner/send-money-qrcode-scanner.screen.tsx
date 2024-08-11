import React, { useState } from 'react';

import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayHeader } from '@app/components/molecules';
import IPayQRCodeScannerComponent from '@app/components/organism/ipay-qrcode-scanner/ipay-qrcode-scanner.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { alertVariant } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';
import { useRoute } from '@react-navigation/core';
import qrCodeScannerStyles from './send-money-qrcode-scanner.style';

const SendMoneyQRScannerScreen: React.FC = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const route = useRoute();
  const [renderQRCodeScanner, setRenderQRCodeScanner] = useState(true);
  const [scannedCode, setScannerCode] = useState('');

  const styles = qrCodeScannerStyles();

  return (
    <IPaySafeAreaView style={styles.fill}>
      <IPayHeader
        title={localizationText.COMMON.SCAN_QR_CODE}
        backBtn
        titleStyle={styles.headerTitle}
        applyFlex
        rightComponent={
          <IPayPressable onPress={goBack}>
            <IPayIcon icon={icons.send_square} size={20} color={colors.primary.primary500} />
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
            text: localizationText.COMMON.GO_BACK,
            onPress: () => {
              route.params.onGoBack(scannedCode);
              setScannerCode('');
              goBack();
            },
          }}
          primaryAction={{ text: localizationText.COMMON.SCAN_AGAIN, onPress: () => setRenderQRCodeScanner(true) }}
          variant={alertVariant.DEFAULT}
          title={localizationText.COMMON.CODE_SCAN_SUCCESSFULLY}
          message={scannedCode}
        />
      )}
    </IPaySafeAreaView>
  );
};

export default SendMoneyQRScannerScreen;