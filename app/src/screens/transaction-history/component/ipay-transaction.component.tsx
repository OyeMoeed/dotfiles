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
import useTheme from '@app/styles/hooks/theme.hook';
import { dateTimeFormat } from '@app/utilities';
import { formatAmount } from '@app/utilities/currency-helper.util';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import getTransationIcon from '@app/utilities/transation-types-helper.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const trnasactionLocalization = 'TRANSACTION_HISTORY.';
  const CAPTION_LINES = 1;

  const transactionRequestType = transaction?.transactionRequestType;

  // case 1
  const COUT_MUSANED = transactionRequestType === TransactionTypes.COUT_MUSANED ?? false;

  // case 2
  const CIN_MUSANED = transactionRequestType === TransactionTypes.CIN_MUSANED ?? false;

  // case 3
  const PAY_WALLET = transactionRequestType === TransactionTypes.PAY_WALLET ?? false;

  // case 4
  const COUT_ATM = transactionRequestType === TransactionTypes.COUT_ATM ?? false;

  // case 5
  const COUT_WU = transactionRequestType === TransactionTypes.COUT_WU ?? false;

  // case 6
  const COUT_ALINMA = transactionRequestType === TransactionTypes.COUT_ALINMA ?? false;

  // case 7
  const CIN_ALINMA = transactionRequestType === TransactionTypes.CIN_ALINMA ?? false;

  // case 8
  const PAY_MRCHNT_IN = transactionRequestType === TransactionTypes.PAY_MRCHNT_IN ?? false;

  // case 9
  const PAY_MRCHNT_OUT = transactionRequestType === TransactionTypes.PAY_MRCHNT_OUT ?? false;

  // case 10
  const PAY_MRCHNT_BILL = transactionRequestType === TransactionTypes.PAY_MRCHNT_BILL ?? false;

  // case 11
  const REFUND = transactionRequestType === TransactionTypes.REFUND ?? false;

  // case 12
  const CIN_CARD = transactionRequestType === TransactionTypes.CIN_CARD ?? false;

  // case 13
  const CIN_CARD_MADA = transactionRequestType === TransactionTypes.CIN_CARD_MADA ?? false;

  // case 14
  const CIN_CARD_VISA = transactionRequestType === TransactionTypes.CIN_CARD_VISA ?? false;

  // case 15
  const CIN_CARD_VISA_APAY = transactionRequestType === TransactionTypes.CIN_CARD_VISA_APAY ?? false;

  // case 16
  const CIN_CARD_MASTER = transactionRequestType === TransactionTypes.CIN_CARD_MASTER ?? false;

  // case 17
  const CIN_WU_REV = transactionRequestType === TransactionTypes.CIN_WU_REV ?? false;

  // case 18
  const COUT_MOBILE = transactionRequestType === TransactionTypes.COUT_MOBILE ?? false;

  // case 19
  const CIN_SARIE = transactionRequestType === TransactionTypes.CIN_SARIE ?? false;

  // case 20
  const COUT_SARIE = transactionRequestType === TransactionTypes.COUT_SARIE ?? false;

  // case 21
  const COUT_IPS = transactionRequestType === TransactionTypes.COUT_IPS ?? false;

  // case 22
  const PAY_BILL = transactionRequestType === TransactionTypes.PAY_BILL ?? false;

  // case 23
  const CARD_ISSUE = transactionRequestType === TransactionTypes.CARD_ISSUE ?? false;

  // case 24
  const CARD_REISSUE = transactionRequestType === TransactionTypes.CARD_REISSUE ?? false;

  // case 25
  const CARD_REPLACE = transactionRequestType === TransactionTypes.CARD_REPLACE ?? false;

  // case 26
  const PAY_VCARD = transactionRequestType === TransactionTypes.PAY_VCARD ?? false;

  // case 27
  const PAY_VCARD_POS = transactionRequestType === TransactionTypes.PAY_VCARD_POS ?? false;

  // case 28
  const PAY_VCARD_ECOM = transactionRequestType === TransactionTypes.PAY_VCARD_ECOM ?? false;

  // case 29
  const PAY_VCARD_SETTLE = transactionRequestType === TransactionTypes.PAY_VCARD_SETTLE ?? false;

  // case 30
  const PAY_MOI = transactionRequestType === TransactionTypes.PAY_MOI ?? false;

  // case 31
  const BKF_TRANSFER = transactionRequestType === TransactionTypes.BKF_TRANSFER ?? false;

  // case 32
  const CIN_SARIE_REV = transactionRequestType === TransactionTypes.CIN_SARIE_REV ?? false;

  // case 33
  const CIN_WALLET = transactionRequestType === TransactionTypes.CIN_WALLET ?? false;

  // case 34
  const CIN_CASH_BACK = transactionRequestType === TransactionTypes.CIN_CASH_BACK ?? false;

  // case 35
  const COUT_EXPRESS = transactionRequestType === TransactionTypes.COUT_EXPRESS ?? false;

  // case 36
  const CIN_EXPRESS_REV = transactionRequestType === TransactionTypes.CIN_EXPRESS_REV ?? false;

  // case 37
  const PAY_VCARD_REFUND = transactionRequestType === TransactionTypes.PAY_VCARD_REFUND ?? false;

  // case 38
  const COUT_GIFT = transactionRequestType === TransactionTypes.COUT_GIFT ?? false;

  // case 39
  const PAY_VCARD_POS_MADA = transactionRequestType === TransactionTypes.PAY_VCARD_POS_MADA ?? false;

  // case 40
  const PAY_VCARD_POS_VISA = transactionRequestType === TransactionTypes.PAY_VCARD_POS_VISA ?? false;

  // case 41
  const PAY_VCARD_POS_NAQD_MADA = transactionRequestType === TransactionTypes.PAY_VCARD_POS_NAQD_MADA ?? false;

  // case 42
  const PAY_VCARD_POS_NAQD_VISA = transactionRequestType === TransactionTypes.PAY_VCARD_POS_NAQD_VISA ?? false;

  // case 43
  const PAY_VCARD_POS_NAQD = transactionRequestType === TransactionTypes.PAY_VCARD_POS_NAQD ?? false;

  // case 44
  const PAY_VCARD_ECOM_MADA = transactionRequestType === TransactionTypes.PAY_VCARD_ECOM_MADA ?? false;

  // case 45
  const PAY_VCARD_ECOM_VISA = transactionRequestType === TransactionTypes.PAY_VCARD_ECOM_VISA ?? false;

  // case 46
  const COUT_ALINMA_REV = transactionRequestType === TransactionTypes.COUT_ALINMA_REV ?? false;

  // case 47
  const COUT_SARIE_REV = transactionRequestType === TransactionTypes.COUT_SARIE_REV ?? false;

  // case 48
  const COUT_SWIFT_REV = transactionRequestType === TransactionTypes.COUT_SWIFT_REV ?? false;

  // case 49
  const REFUND_SADAD_REV = transactionRequestType === TransactionTypes.REFUND_SADAD_REV ?? false;

  // case 50
  const CASHBACK = transactionRequestType === TransactionTypes.CASHBACK ?? false;

  // case 51
  const CIN_VISA_CASHBACK = transactionRequestType === TransactionTypes.CIN_VISA_CASHBACK ?? false;

  // case 52
  const CIN_CARD_MADA_APAY = transactionRequestType === TransactionTypes.CIN_CARD_MADA_APAY ?? false;

  // case 53
  const CIN_CARD_MASTER_APAY = transactionRequestType === TransactionTypes.CIN_CARD_MASTER_APAY ?? false;

  // case 54
  const PAY_ONECARD = transactionRequestType === TransactionTypes.PAY_ONECARD ?? false;

  const PAYMENT_REQUEST = transactionRequestType === TransactionTypes.PAYMENT_REQUEST ?? false;

  const renderTrxsItemTitleAndDesc = () => {
    // view case 1
    if (COUT_MUSANED) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.SALARY')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.MUSANED')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_MUSANED) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.SALARY')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.MUSANED')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_WALLET) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.WALLET_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_ATM) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.QR_WITHDRAWAL')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.ATM')}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_WU) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.WU_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_ALINMA) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.ALINMA_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_ALINMA) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.senderName}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.ALINMA_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    // if (PAY_MRCHNT_IN) {
    //   return (
    //     <>
    //     <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
    //       pending
    //     </IPayFootnoteText>
    //     <IPayCaption1Text
    //       numberOfLines={CAPTION_LINES}
    //       style={styles.trasnactionTypeText}
    //       color={colors.natural.natural900}
    //       shouldTranslate={false}
    //     >
    //       pending
    //     </IPayCaption1Text>
    //     </>
    //   );
    // }
    // if (PAY_MRCHNT_OUT) {
    //   return (
    //     <>
    //     <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
    //     pending
    //     </IPayFootnoteText>
    //     <IPayCaption1Text
    //       numberOfLines={CAPTION_LINES}
    //       style={styles.trasnactionTypeText}
    //       color={colors.natural.natural900}
    //       shouldTranslate={false}
    //     >
    //       pending
    //     </IPayCaption1Text>
    //     </>
    //   );
    // }
    // if (PAY_MRCHNT_BILL) {
    //   return (
    //     <>
    //     <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
    //     pending
    //     </IPayFootnoteText>
    //     <IPayCaption1Text
    //       numberOfLines={CAPTION_LINES}
    //       style={styles.trasnactionTypeText}
    //       color={colors.natural.natural900}
    //       shouldTranslate={false}
    //     >
    //       dd
    //     </IPayCaption1Text>
    //     </>
    //   );
    // }
    if (REFUND) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant or Service Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.REFUND')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_CARD) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.ADD_MONEY')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.CARD')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_CARD_MADA) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.ADD_MONEY')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.MADA_CARD')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_CARD_VISA) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.ADD_MONEY')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.VISA_CARD')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_CARD_VISA_APAY) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.ADD_MONEY')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            Apple Pay
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_CARD_MASTER) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.ADD_MONEY')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.MASTER_CARD')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_WU_REV) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            Transfer Reversal
            {t('TRANSACTION_HISTORY.TRANSFER_REVERSAL')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.WU_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_MOBILE) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.WALLET_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_SARIE) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.senderName}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.LOCAL_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_SARIE) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.LOCAL_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_IPS) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.LOCAL_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_BILL) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.BILL_PAYMENT')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.SADAD')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CARD_ISSUE) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.CARD_ISSUANCE')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.FEES')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CARD_REISSUE) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.CARD_REISSUANCE')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.FEES')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CARD_REPLACE) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.CARD_REPLACEMENT')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.FEES')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_VCARD) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.CARD_PURCHASE')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_VCARD_POS) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.POS_PURCHASE')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_VCARD_ECOM) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.INTERNET_PURCHASE')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_VCARD_SETTLE) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.INTERNET_PURCHASE')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_MOI) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [MOI service Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.MOI_PAYMENT')}
          </IPayCaption1Text>
        </>
      );
    }
    if (BKF_TRANSFER) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.WALLET_CREDIT')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.INTERNAL_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_SARIE_REV) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.LOCAL_TRANSFER_REVERSAL')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_WALLET) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.senderName}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.ALINMA_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_CASH_BACK) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.CASH_BACK')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {/* empty desc */}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_EXPRESS) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.ALINMA_DIRECT_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_EXPRESS_REV) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.TRANSFER_REVERSAL')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.ALINMAPAY_DIRECT')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_VCARD_REFUND) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.INTERNET_PURCHASE_OR_POS_PURCHASE')}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_GIFT) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.GIFT')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_VCARD_POS_MADA) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.POS_PURCHASE')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_VCARD_POS_VISA) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.POS_PURCHASE')}
          </IPayCaption1Text>
        </>
      );
    }
    // if (PAY_VCARD_POS_NAQD_MADA) {
    //   return (
    //     <>
    //     <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
    //       s
    //     </IPayFootnoteText>
    //     <IPayCaption1Text
    //       numberOfLines={CAPTION_LINES}
    //       style={styles.trasnactionTypeText}
    //       color={colors.natural.natural900}
    //       shouldTranslate={false}
    //     >
    //       dd
    //     </IPayCaption1Text>
    //     </>
    //   );
    // }
    // if (PAY_VCARD_POS_NAQD_VISA) {
    //   return (
    //     <>
    //     <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
    //       s
    //     </IPayFootnoteText>
    //     <IPayCaption1Text
    //       numberOfLines={CAPTION_LINES}
    //       style={styles.trasnactionTypeText}
    //       color={colors.natural.natural900}
    //       shouldTranslate={false}
    //     >
    //       dd
    //     </IPayCaption1Text>
    //     </>
    //   );
    // }
    // if (PAY_VCARD_POS_NAQD) {
    //   return (
    //     <>
    //     <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
    //       s
    //     </IPayFootnoteText>
    //     <IPayCaption1Text
    //       numberOfLines={CAPTION_LINES}
    //       style={styles.trasnactionTypeText}
    //       color={colors.natural.natural900}
    //       shouldTranslate={false}
    //     >
    //       dd
    //     </IPayCaption1Text>
    //     </>
    //   );
    // }
    if (PAY_VCARD_ECOM_MADA) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.INTERNET_PURCHASE')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_VCARD_ECOM_VISA) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.INTERNET_PURCHASE')}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_ALINMA_REV) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.TRANSFER_REVERSAL')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.ALINMA_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_SARIE_REV) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.TRANSFER_REVERSAL')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.LOCAL_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (COUT_SWIFT_REV) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.REVERSE_INCOMING_TRANSFER')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.SWIFT_TRANSFER')}
          </IPayCaption1Text>
        </>
      );
    }
    if (REFUND_SADAD_REV) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.BILL_REFUND_REVERSAL')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.SADAD')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CASHBACK) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.PROMO_CASHBACK')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.CASHBACK')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_VISA_CASHBACK) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.CARD_CASHBACK')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.CASHBACK')}
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_CARD_MADA_APAY) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.ADD_MONEY')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            Apple Pay
          </IPayCaption1Text>
        </>
      );
    }
    if (CIN_CARD_MASTER_APAY) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {t('TRANSACTION_HISTORY.ADD_MONEY')}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            Apple Pay
          </IPayCaption1Text>
        </>
      );
    }
    if (PAY_ONECARD) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            [Merchant Name]
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.MARKETPLACE_PURCHASE')}
          </IPayCaption1Text>
        </>
      );
    }
    if (PAYMENT_REQUEST) {
      return (
        <>
          <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
            {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
          </IPayFootnoteText>
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            shouldTranslate={false}
          >
            {t('TRANSACTION_HISTORY.MONEY_REQUEST')}
          </IPayCaption1Text>
        </>
      );
    }
  };

  const renderLeftIcon = () => {
    if (isBeneficiaryHistory) {
      return <IPayIcon icon={transaction?.bankId} size={18} />;
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
    if (transaction?.transactionRequestType === TransactionTypes.PAY_WALLET || isBeneficiaryHistory) {
      return (
        <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
          {isBeneficiaryHistory ? transaction?.beneficiaryName : transaction?.nickname || transaction?.mobileNumber}
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
          shouldTranslate={false}
        >
          {transaction?.transactionRequestType}
        </IPayCaption1Text>
      );
    }

    return (
      <IPayFootnoteText style={styles.transactionRequestTypeDescStyle} numberOfLines={1} shouldTranslate={false}>
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
          shouldTranslate={false}
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
          shouldTranslate={false}
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
          text="TRANSACTION_HISTORY.SEND_MONEY"
        />
      );
    }
    if (isBeneficiaryHistory) {
      return (
        <IPayCaption1Text
          numberOfLines={CAPTION_LINES}
          style={styles.trasnactionTypeText}
          color={colors.natural.natural900}
        >
          {transaction?.bankName ?? ''}
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
          text="TRANSACTION_HISTORY.RECEIVED_MONEY"
        />
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
          shouldTranslate={false}
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
          shouldTranslate={false}
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
          shouldTranslate={false}
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
          shouldTranslate={false}
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
          text={`${t('TRANSACTION_HISTORY.GIFT_TO')} ${
            transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
          }`}
          shouldTranslate={false}
        />
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
          shouldTranslate={false}
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
          shouldTranslate={false}
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
            text={`${t('TRANSACTION_HISTORY.GIFT_FROM')} ${
              transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
            }`}
            shouldTranslate={false}
          />
          <IPayCaption1Text
            numberOfLines={CAPTION_LINES}
            style={styles.trasnactionTypeText}
            color={colors.natural.natural900}
            text={`${t('TRANSACTION_HISTORY.PAY_FROM')} ${
              transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
            }`}
            shouldTranslate={false}
          />
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
          text={`${t('TRANSACTION_HISTORY.PAY_TO')} ${
            transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber
          }`}
          shouldTranslate={false}
        />
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
          shouldTranslate={false}
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
            <IPayFootnoteText
              style={styles.benficiaryInternationalTransfer}
              numberOfLines={1}
              regular={false}
              shouldTranslate={false}
            >
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
          {/* {renderTrxsTopTitle()}
          {renderTrxsItemTitle()}
          {renderTrxsSecondTitle()} */}
          {renderTrxsItemTitleAndDesc()}

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
          shouldTranslate={false}
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
          }${formatAmount(transaction?.amount)} ${t('COMMON.SAR')}`}
        </IPayFootnoteText>
        <IPayCaption2Text style={styles.dateStyle} shouldTranslate={false}>
          {formatDateAndTime(new Date(transaction?.transactionDateTime), dateTimeFormat.DateAndTime)}
        </IPayCaption2Text>
      </IPayView>
    </IPayPressable>
  );
};

export default IPayTransactionItem;
