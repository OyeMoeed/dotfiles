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
import { LocalizationKeysMapping, TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
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

  const iconMapping: Record<TransactionTypes, string> = {
    [TransactionTypes.SEND_MONEY]: icons.send_money,
    [TransactionTypes.RECEIVED_MONEY]: icons.money_request,
    [TransactionTypes.POS_PURCHASE]: icons.receipt_item,
    [TransactionTypes.E_COMMERCE]: icons.receipt_item,
    [TransactionTypes.CASHBACK]: icons.wallet_money,
    [TransactionTypes.VISA_SIGNATURE_CARD_INSURANCE]: icons.card,
    [TransactionTypes.ATM]: icons.card,
    [TransactionTypes.LOCAL_TRANSFER]: icons.card,
    [TransactionTypes.APPLE_PAY_TOP_UP]: icons.wallet_add,
  };

  return (
    <IPayPressable
      testID={testID}
      style={styles.historyContStyle}
      onPress={() => onPressTransaction && onPressTransaction(transaction)}
    >
      <IPayView style={styles.commonContainerStyle}>
        <IPayView style={styles.iconStyle}>
          {transaction.transactionType === TransactionTypes.LOCAL_TRANSFER ? (
            <IpayFlagIcon country="ar" testID={testID} />
          ) : (
            <IPayIcon icon={icons.tick_square} size={18} color={colors.primary.primary800} />
          )}
        </IPayView>
        <IPayView>
          <IPayFootnoteText style={styles.footnoteBoldTextStyle}>{transaction?.nickname}</IPayFootnoteText>
          <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
            {transaction.transactionRequestType}
          </IPayCaption1Text>
        </IPayView>
      </IPayView>

      <IPayView style={styles.currencyStyle}>
        <IPayFootnoteText
          style={[
            styles.footnoteBoldTextStyle,
            transaction?.transactionType === TransactionOperations.DEBIT
              ? styles.footnoteGreenTextStyle
              : styles.footnoteRedTextStyle,
          ]}
        >
          {`${
            transaction.transactionType === TransactionOperations.DEBIT ? '+' : '-'
          }${transaction.amount} ${localizationText.COMMON.SAR}`}
        </IPayFootnoteText>
        <IPayCaption2Text style={styles.dateStyle}>
          {formatDateAndTime(new Date(transaction.transactionDateTime), dateTimeFormat.DateAndTime)}
        </IPayCaption2Text>
      </IPayView>
    </IPayPressable>
  );
};

export default IPayTransactionItem;
