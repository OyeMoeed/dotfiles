import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
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
const IPayTransactionItem: React.FC<IPayTransactionProps> = ({
  testID,
  transaction,
  onPressTransaction,
  isBeneficiaryHistory,
  style,
}) => {
  const { colors } = useTheme();
  const styles = transactionItemStyles(colors);
  const localizationText = useLocalization();

  const renderLeftIcon = () => {
    if (isBeneficiaryHistory) {
      return <IPayImage image={transaction?.bankImage} style={styles.leftImageStyle} />;
    }
    return <IPayIcon icon={icons.tick_square} size={18} color={colors.primary.primary800} />;
  };

  return (
    <IPayPressable
      testID={testID}
      style={[styles.historyContStyle, style]}
      onPress={() => onPressTransaction && onPressTransaction(transaction)}
    >
      <IPayView style={styles.commonContainerStyle}>
        <IPayView style={styles.iconStyle}>
          {transaction.transactionRequestType === TransactionTypes.BKF_TRANSFER ? (
            <IpayFlagIcon country="ar" testID={testID} />
          ) : (
            renderLeftIcon()
          )}
        </IPayView>
        <IPayView>
          <IPayFootnoteText style={styles.footnoteBoldTextStyle}>
            {isBeneficiaryHistory ? transaction?.beneficiaryName : transaction?.nickname}
          </IPayFootnoteText>
          <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
            {isBeneficiaryHistory
              ? transaction.bankName
              : localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[transaction.transactionRequestType]]}
          </IPayCaption1Text>
          {transaction?.transaction_medium && (
            <IPayCaption1Text style={styles.trasnactionTypeText}>
              {localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[transaction.transaction_medium]]}
            </IPayCaption1Text>
          )}
        </IPayView>
      </IPayView>

      <IPayView style={styles.currencyStyle}>
        {transaction?.status && (
          <IPayCaption1Text regular={false} style={styles.transactionStatus}>
            {localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[transaction.status]]}
          </IPayCaption1Text>
        )}
        <IPayFootnoteText
          style={[
            styles.footnoteBoldTextStyle,
            transaction.type === TransactionOperations.DEBIT ||
            transaction?.transactionType === TransactionOperations.DEBIT
              ? styles.footnoteGreenTextStyle
              : styles.footnoteRedTextStyle,
          ]}
        >
          {`${
            transaction?.type === TransactionOperations.DEBIT ||
            transaction.transactionType === TransactionOperations.DEBIT
              ? '+'
              : '-'
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
