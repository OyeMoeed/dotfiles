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
import { formatAmount } from '@app/utilities/currency-helper.util';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import { dateTimeFormat } from '@app/utilities';
import getTransationIcon from '@app/utilities/transation-types-helper.util';
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
  internationalTransfer,
  style,
}) => {
  const { colors } = useTheme();
  const styles = transactionItemStyles(colors);
  const localizationText = useLocalization();
  const trnasactionLocalization = localizationText.TRANSACTION_HISTORY;
  const CAPTION_LINES = 1;

  const renderLeftIcon = () => {
    if (isBeneficiaryHistory) {
      return <IPayImage image={transaction?.bankImage} style={styles.leftImageStyle} />;
    }
    if (internationalTransfer) {
      return <IpayFlagIcon country={transaction?.countryFlag} testID={testID} />;
    }
    return (
      <IPayIcon
        icon={getTransationIcon(transaction?.transactionRequestType, transaction?.transactionType)}
        size={18}
        color={colors.primary.primary800}
      />
    );
  };

  const renderTrxsItemTitle = () => {
    if (transaction?.transactionRequestType === TransactionTypes.PAY_WALLET) {
      return (
        <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1}>
          {transaction?.nickname || transaction?.mobileNumber}
        </IPayFootnoteText>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.CIN_VISA_CASHBACK &&
      transaction?.transactionType === TransactionOperations.CREDIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.transactionRequestType}
        </IPayCaption1Text>
      );
    }

    return (
      <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1}>
        {transaction?.transactionRequestTypeDesc}
      </IPayFootnoteText>
    );
  };

  const renderTrxsSecondTitle = () => {
    if (transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_REFUND_REV) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.transactionRequestTypeDesc}
        </IPayCaption1Text>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_REFUND &&
      transaction?.transactionType === TransactionOperations.CREDIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.transactionRequestTypeDesc}
        </IPayCaption1Text>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.PAY_WALLET &&
      transaction?.transactionType === TransactionOperations.DEBIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {localizationText.TRANSACTION_HISTORY.SEND_MONEY}
        </IPayCaption1Text>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.PAY_WALLET &&
      transaction?.transactionType === TransactionOperations.CREDIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {localizationText.TRANSACTION_HISTORY.RECEIVED_MONEY}
        </IPayCaption1Text>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_REFUND &&
      transaction?.transactionType === TransactionOperations.DEBIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.transactionRequestTypeDesc}
        </IPayCaption1Text>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.PAY_ONECARD &&
      transaction?.transactionType === TransactionOperations.DEBIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.transactionRequestTypeDesc}
        </IPayCaption1Text>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.COUT_MUSANED &&
      transaction?.transactionType === TransactionOperations.DEBIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.transactionRequestTypeDesc}
        </IPayCaption1Text>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.COUT_MUSANED &&
      transaction?.transactionType === TransactionOperations.CREDIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.transactionRequestTypeDesc}
        </IPayCaption1Text>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.COUT_GIFT &&
      transaction?.transactionType === TransactionOperations.DEBIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {`${localizationText.TRANSACTION_HISTORY.GIFT_TO} ${
            transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
          }`}
        </IPayCaption1Text>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.CIN_MAZAYA &&
      transaction?.transactionType === TransactionOperations.CREDIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.transactionRequestTypeDesc}
        </IPayCaption1Text>
      );
    }
    if (transaction?.transactionRequestType === TransactionTypes.CARD_VCB_REPLACE) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.transactionRequestTypeDesc}
        </IPayCaption1Text>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.COUT_GIFT &&
      transaction?.transactionType === TransactionOperations.CREDIT
    ) {
      return (
        <>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
          >
            {`${localizationText.TRANSACTION_HISTORY.GIFT_FROM} ${
              transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
            }`}
          </IPayCaption1Text>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
          >
            {`${localizationText.TRANSACTION_HISTORY.PAY_FROM} ${
              transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
            }`}
          </IPayCaption1Text>
        </>
      );
    }
    if (
      transaction?.transactionRequestType === TransactionTypes.COUT_MOBILE &&
      transaction?.transactionType === TransactionOperations.DEBIT
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {`${localizationText.TRANSACTION_HISTORY.PAY_TO} ${
            transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
          }`}
        </IPayCaption1Text>
      );
    }
    if (
      !internationalTransfer &&
      transaction?.transactionRequestType !== TransactionTypes.COUT_SARIE &&
      transaction?.transactionRequestType !== TransactionTypes.COUT_ALINMA
    ) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.beneficiaryName}
        </IPayCaption1Text>
      );
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  };

  const renderTrxsTopTitle = () => {
    if (
      transaction?.walletTransactionStatus &&
      transaction?.walletTransactionStatus.toLowerCase() === 'initiated' &&
      transaction?.transactionRequestType !== TransactionTypes.CIN_VISA_CASHBACK
    ) {
      return <IPayFootnoteText style={styles.footnoteBoldTextStyle}>Authorized</IPayFootnoteText>;
    }
    if (internationalTransfer) {
      return (
        <>
          {transaction?.beneficiaryName && (
            <IPayFootnoteText style={styles.benficiaryInternationalTransfer} numberOfLines={1} regular={false}>
              {transaction?.beneficiaryName}
            </IPayFootnoteText>
          )}
          {transaction?.transactionType && (
            <IPayCaption1Text
              numberOfLines={CAPTION_LINES}
              style={styles.trasnactionTypeInternationalTransfer}
              color={colors.natural.natural900}
            >
              {`${trnasactionLocalization[LocalizationKeysMapping[transaction?.transactionType] as keyof typeof trnasactionLocalization]}`}
            </IPayCaption1Text>
          )}
          {transaction?.transactionMedium && (
            <IPayCaption1Text
              numberOfLines={CAPTION_LINES}
              style={styles.trasnactionTypeInternationalTransfer}
              color={colors.natural.natural900}
            >
              {`${trnasactionLocalization[LocalizationKeysMapping[transaction?.transactionMedium] as keyof typeof trnasactionLocalization]}`}
            </IPayCaption1Text>
          )}
        </>
      );
    }

    return <IPayView />;
  };

  const isArabicFlag =
    transaction?.transactionRequestType === TransactionTypes.CIN_SARIE ||
    transaction?.transactionRequestType === TransactionTypes.COUT_SARIE;

  return (
    <IPayPressable
      testID={testID}
      style={[styles.historyContStyle, style]}
      onPress={() => onPressTransaction?.(transaction)}
    >
      <IPayView style={styles.commonContainerStyle}>
        <IPayView style={styles.iconStyle}>
          {isArabicFlag ? <IpayFlagIcon country="ar" testID={testID} /> : renderLeftIcon()}
        </IPayView>
        <IPayView style={styles.textContainer}>
          {renderTrxsTopTitle()}
          {renderTrxsItemTitle()}
          {renderTrxsSecondTitle()}
        </IPayView>
      </IPayView>
      {!internationalTransfer && transaction?.status ? (
        <IPayView style={[styles.currencyStyle, styles.textContainer]}>
          {transaction?.status && (
            <IPayCaption1Text
              numberOfLines={CAPTION_LINES}
              style={styles.transactionStatus}
              color={colors.natural.natural500}
              regular={false}
            >
              {transaction?.status}
            </IPayCaption1Text>
          )}
        </IPayView>
      ) : (
        <IPayView />
      )}

      <IPayView style={[styles.currencyStyle, styles.textContainer]}>
        {internationalTransfer && (
          <IPayView style={styles.currencyStyle}>
            {transaction?.status && (
              <IPayCaption1Text
                numberOfLines={CAPTION_LINES}
                style={styles.transactionStatus}
                color={colors.natural.natural500}
                regular={false}
              >
                {transaction?.status}
              </IPayCaption1Text>
            )}
          </IPayView>
        )}

        <IPayFootnoteText
          style={[
            styles.footnoteBoldTextStyle,
            transaction?.type === TransactionOperations.DEBIT ||
            transaction?.transactionType === TransactionOperations.DEBIT
              ? styles.footnoteRedTextStyle
              : styles.footnoteGreenTextStyle,
          ]}
        >
          {`${
            transaction?.transactionType === TransactionOperations.DEBIT ? '-' : '+'
          }${formatAmount(transaction?.amount)} ${localizationText.COMMON.SAR}`}
        </IPayFootnoteText>
        <IPayCaption2Text style={styles.dateStyle}>
          {formatDateAndTime(new Date(transaction?.transactionDateTime), dateTimeFormat.DateAndTime)}
        </IPayCaption2Text>
      </IPayView>
    </IPayPressable>
  );
};

export default IPayTransactionItem;
