import { IPayCaption2Text, IPayCheckbox, IPayFootnoteText, IPayImage, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayTransferServiceProps } from './ipay-transfer-service.interface';
import transferServiceStyles from './ipay-transfer-service.styles';

const IPayTransferService: React.FC<IPayTransferServiceProps> = ({
  item,
  selectedService,
  setSelectedService,
  testID,
}) => {
  const { colors } = useTheme();
  const styles = transferServiceStyles(colors);
  const localizationText = useLocalization();
  const { serviceName, exchangeRate, fees, total, serviceLogo, recordID, toConvert } = item;

  return (
    <IPayView testID={`${testID}-transfer-service`} style={styles.cardStyle}>
      <IPayView style={styles.itemDetails}>
        <IPayView style={styles.rowStyles}>
          <IPayImage image={serviceLogo} style={styles.logoStyles} />
          <IPayFootnoteText style={styles.textColor} regular={false} text={serviceName} />
        </IPayView>
        <IPayView style={[styles.rowStyles]}>
          <IPayCaption2Text
            style={[styles.lightTextColor, styles.chipColor]}
            text={`${toConvert} ${localizationText.COMMON.SAR} = ${exchangeRate}`}
            regular
          />
          <IPayCaption2Text
            style={[styles.lightTextColor, styles.chipColor]}
            text={`${localizationText.LOCAL_TRANSFER.FEES}: ${fees}`}
            regular
          />
        </IPayView>
      </IPayView>
      <IPayView style={styles.rowStyles}>
        <IPayFootnoteText style={styles.textColor} text={total} regular={false} />
        <IPayFootnoteText style={styles.textColor} text={localizationText.COMMON.EGP} regular />
      </IPayView>
      <IPayCheckbox isCheck={selectedService === recordID} onPress={() => setSelectedService(recordID)} />
    </IPayView>
  );
};

export default IPayTransferService;
