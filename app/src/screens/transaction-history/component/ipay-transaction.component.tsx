import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayView,
} from '@app/components/atoms/index';
import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import { transactionOperations, transactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayTransactionProps } from './ipay-transaction.interface';
import transactionItemStyles from './ipay-transaction.style';

/**
 * A component consisting of transaction history object
 * @param {IPayTransactionProps} props - The props for the IPayTransactionItem component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTransactionItem: React.FC<IPayTransactionProps> = ({ testID, transaction, onPressTransaction }) => {
  const { colors } = useTheme();
  const styles = transactionItemStyles(colors);
  const localizationText = useLocalization();

  const iconMapping: Record<transactionTypes, string> = {
    [transactionTypes.SEND_MONEY]: icons.send_money,
    [transactionTypes.RECEIVED_MONEY]: icons.money_request,
    [transactionTypes.POS_PURCHASE]: icons.receipt_item,
    [transactionTypes.E_COMMERCE]: icons.receipt_item,
    [transactionTypes.CASHBACK]: icons.wallet_money,
    [transactionTypes.VISA_SIGNATURE_CARD_INSURANCE]: icons.card,
    [transactionTypes.ATM]: icons.card,
    [transactionTypes.LOCAL_TRANSFER]: icons.card,
    [transactionTypes.APPLE_PAY_TOP_UP]: icons.wallet_add,
  };

  return (
    <IPayPressable
      testID={testID}
      style={styles.historyContStyle}
      onPress={() => onPressTransaction && onPressTransaction(transaction)}
    >
      <IPayView style={styles.commonContainerStyle}>
        <IPayView style={styles.iconStyle}>
          {transaction.transaction_type === transactionTypes.LOCAL_TRANSFER ? (
            <IpayFlagIcon country="ar" testID={testID} />
          ) : (
            <IPayIcon icon={iconMapping[transaction.transaction_type]} size={18} color={colors.primary.primary800} />
          )}
        </IPayView>
        <IPayView>
          <IPayFootnoteText style={styles.footnoteBoldTextStyle}>{transaction.name}</IPayFootnoteText>
          <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
            {localizationText[transaction.transaction_type]}
          </IPayCaption1Text>
        </IPayView>
      </IPayView>

      <IPayView style={styles.currencyStyle}>
        <IPayFootnoteText
          style={[
            styles.footnoteBoldTextStyle,
            transaction.type === transactionOperations.DEBIT
              ? styles.footnoteGreenTextStyle
              : styles.footnoteRedTextStyle,
          ]}
        >
          {`${
            transaction.type === transactionOperations.DEBIT ? '+' : '-'
          }${transaction.amount} ${localizationText.sar}`}
        </IPayFootnoteText>
        <IPayCaption2Text style={styles.dateStyle}>{transaction.transaction_date}</IPayCaption2Text>
      </IPayView>
    </IPayPressable>
  );
};

export default IPayTransactionItem;
