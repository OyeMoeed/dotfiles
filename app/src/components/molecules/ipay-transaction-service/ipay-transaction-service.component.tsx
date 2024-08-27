import { IPayCaption2Text, IPayCheckbox, IPayFootnoteText, IPayImage, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import { TransferService } from '@app/screens/edit-international-beneficiary-transfer/edit-international-beneficiary-transfer.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayTransactionServiceProps } from './ipay-transaction-service.interface';
import transactionServiceStyles from './ipay-transaction-service.styles';

const IPayTransactionService: React.FC<IPayTransactionServiceProps> = ({
  transaction,
  selectedService,
  setSelectedService,
  testID,
}) => {
  const { colors } = useTheme();
  const styles = transactionServiceStyles(colors);
  const localizationText = useLocalization();
  const { serviceName, fees, total, serviceLogo, recordID, currency, fromAmount, fromCurrency, toAmount, toCurrency } =
    transaction;

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
            text={`${fromAmount} ${fromCurrency} = ${toAmount} ${toCurrency}`}
            regular
          />
          <IPayCaption2Text
            style={[styles.lightTextColor, styles.chipColor]}
            text={`${localizationText.LOCAL_TRANSFER.FEES}: ${fees} ${currency} `}
            regular
          />
        </IPayView>
        {serviceName === TransferService.ALINMAPAY_DIRECT && (
          <IPayCaption2Text color={colors.natural.natural500} text={localizationText.COMMON.PRICE_VARY} />
        )}
      </IPayView>
      <IPayView style={styles.rowStyles}>
        <IPayFootnoteText style={styles.textColor} text={total} regular={false} />
        <IPayFootnoteText style={styles.textColor} text={currency} regular />
        <IPayCheckbox style={styles.marginLeft} isCheck={selectedService === recordID} onPress={() => setSelectedService(recordID)} />
      </IPayView>
    </IPayView>
  );
};

export default IPayTransactionService;
