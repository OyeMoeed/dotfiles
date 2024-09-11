import React, { useState } from 'react';

import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayHeader } from '@app/components/molecules';
import IPayQRCodeScannerComponent from '@app/components/organism/ipay-qrcode-scanner/ipay-qrcode-scanner.component';
import { ALINMA_REFERENCE_NUM } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { alertVariant } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';
import { useRoute } from '@react-navigation/core';
import { debounce } from 'lodash';
import IQrData from '../wallet/use-save-qrcode.interface';
import qrCodeScannerStyles from './send-money-qrcode-scanner.style';

const SendMoneyQRScannerScreen: React.FC = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const route = useRoute();
  const [renderQRCodeScanner, setRenderQRCodeScanner] = useState(true);
  const [, setScannerCode] = useState('');

  const styles = qrCodeScannerStyles();
  const onScannedContact = (scannedCodeData: string) => {
    route?.params?.onGoBack(scannedCodeData);
    setScannerCode('');
    goBack();
  };

  const alertGoBackPress = debounce(() => {
    route?.params?.onGoBack('');
    setScannerCode('');
    goBack();
  }, 500);

  return (
    <IPaySafeAreaView style={styles.fill}>
      <IPayHeader
        title="COMMON.SCAN_QR_CODE"
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
          onRead={(data) => {
            try {
              const dataFormatted: IQrData = JSON.parse(data);
              if (dataFormatted.reference !== ALINMA_REFERENCE_NUM) {
                setRenderQRCodeScanner(false);
              } else if (dataFormatted?.contact) {
                setScannerCode(dataFormatted?.contact);
                onScannedContact(dataFormatted?.contact);
              }
            } catch (error) {
              setRenderQRCodeScanner(false);
            }
          }}
        />
      ) : (
        <IPayAlert
          secondaryAction={{
            text: localizationText.COMMON.GO_BACK,
            onPress: alertGoBackPress,
          }}
          primaryAction={{ text: localizationText.COMMON.SCAN_AGAIN, onPress: () => setRenderQRCodeScanner(true) }}
          variant={alertVariant.DESTRUCTIVE}
          title="ERROR.INVALID_QRCODE"
        />
      )}
    </IPaySafeAreaView>
  );
};

export default SendMoneyQRScannerScreen;
