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
import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import React, { useMemo } from 'react';
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
}) => {
  const { colors } = useTheme();
  const styles = transactionItemStyles(colors);
  const localizationText = useLocalization();

  const getIcon = useMemo(() => {
    switch (transaction.transactionRequestType) {
      case TransactionTypes.PAY_BILL:
        return icons.receipt_item;
      case TransactionTypes.COUT_EXPRESS:
        return icons.receipt_item;
      case TransactionTypes.CIN_CASH_BACK:
        return icons.wallet_money;
      case TransactionTypes.ATM:
        return icons.card;
      case TransactionTypes.APPLE_PAY_TOP_UP:
        return icons.wallet_add;
      default:
        return icons.send_money;
    }
  }, [transaction]);

  const renderLeftIcon = () => {
    if (isBeneficiaryHistory) {
      return <IPayImage image={transaction?.bankImage} style={styles.leftImageStyle} />;
    }
    return <IPayIcon icon={getIcon} size={18} color={colors.primary.primary800} />;
  };

  return (
    <IPayPressable
      testID={testID}
      style={styles.historyContStyle}
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
          {transaction?.walletTransactionStatus.toLowerCase() === 'initiated' &&
            transaction?.transactionRequestType !== TransactionTypes.cout_gift  && (
              <IPayFootnoteText style={styles.footnoteBoldTextStyle}>Authorized</IPayFootnoteText>
            )}

          {transaction?.transactionRequestType !== TransactionTypes.CIN_VISA_CASHBACK && (
            <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1}>
              {transaction?.transactionRequestTypeDesc}
            </IPayFootnoteText>
          )}

          {transaction?.transactionRequestType !== TransactionTypes.COUT_SARIE &&
            transaction?.transactionRequestType !== TransactionTypes.COUT_ALINMA && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {transaction?.beneficiaryName}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.CIN_VISA_CASHBACK &&
            transaction?.transactionType === TransactionOperations.CREDIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {transaction?.transactionRequestType}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_REFUND_REV && (
            <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
              {transaction?.transactionRequestTypeDesc}
            </IPayCaption1Text>
          )}

          {transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_REFUND_REV &&
            transaction?.transactionType === TransactionOperations.DEBIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {transaction?.transactionRequestTypeDesc}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_REFUND_REV && (
            <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
              {transaction?.transactionRequestTypeDesc}
            </IPayCaption1Text>
          )}

          {transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_REFUND &&
            transaction?.transactionType === TransactionOperations.CREDIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {transaction?.transactionRequestTypeDesc}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_REFUND &&
            transaction?.transactionType === TransactionOperations.DEBIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {transaction?.transactionRequestTypeDesc}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.PAY_ONECARD &&
            transaction?.transactionType === TransactionOperations.DEBIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {transaction?.transactionRequestTypeDesc}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.COUT_MUSANED &&
            transaction?.transactionType === TransactionOperations.DEBIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {transaction?.transactionRequestTypeDesc}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.COUT_MUSANED &&
            transaction?.transactionType === TransactionOperations.CREDIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {transaction?.transactionRequestTypeDesc}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.COUT_GIFT &&
            transaction?.transactionType === TransactionOperations.DEBIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {`${localizationText.TRANSACTION_HISTORY.GIFT_TO} ${
                  transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
                }`}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.CIN_MAZAYA &&
            transaction?.transactionType === TransactionOperations.CREDIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {transaction?.transactionRequestTypeDesc}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.CARD_VCB_REPLACE && (
            <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
              {transaction?.transactionRequestTypeDesc}
            </IPayCaption1Text>
          )}

          {transaction?.transactionRequestType === TransactionTypes.COUT_GIFT &&
            transaction?.transactionType === TransactionOperations.CREDIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {`${localizationText.TRANSACTION_HISTORY.GIFT_FROM} ${
                  transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
                }`}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.COUT_MOBILE &&
            transaction?.transactionType === TransactionOperations.CREDIT && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {`${localizationText.TRANSACTION_HISTORY.PAY_FROM} ${
                  transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
                }`}
              </IPayCaption1Text>
            )}

          {transaction?.transactionRequestType === TransactionTypes.COUT_MOBILE &&
            transaction?.transactionType === TransactionOperations.DEBIT &&
            transaction?.walletTransactionStatus.toLowerCase() !== 'initiated' && (
              <IPayCaption1Text style={styles.trasnactionTypeText} color={colors.natural.natural900}>
                {`${localizationText.TRANSACTION_HISTORY.PAY_TO} ${
                  transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
                }`}
              </IPayCaption1Text>
            )}
        </IPayView>
      </IPayView>

      <IPayView style={styles.currencyStyle}>
        <IPayFootnoteText
          style={[
            styles.footnoteBoldTextStyle,
            transaction?.transactionType === TransactionOperations.DEBIT
              ? styles.footnoteRedTextStyle
              : styles.footnoteGreenTextStyle,
          ]}
        >
          {`${
            transaction.transactionType === TransactionOperations.DEBIT ? '-' : '+'
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
