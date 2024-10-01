// TODO: Fix max function for this file and indent
/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
import icons from '@app/assets/icons';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayTitle3Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayList, IPayShareableImageView } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { TransactionOperations, TransactionsStatus, TransactionTypes } from '@app/enums/transaction-types.enum';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { isIosOS } from '@app/utilities/constants';
import { formatSlashDateTime } from '@app/utilities/date-helper.util';
import { ApiResponseStatusType, buttonVariants, ToastTypes } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateInvoiceProps } from '@app/network/services/core/transaction/transaction.interface';
import { generateInvoice } from '@app/network/services/core/transaction/transactions.service';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import Share from 'react-native-share';
import transactionHistoryStyle from './ipay-transaction-history.style';
import { IPayTransactionProps, MultiTransactionsProps } from './ipay-transaction-history.interface';

const MultiTransactions: React.FC<MultiTransactionsProps> = ({
  transaction,
  isDebit,
  isCountGift,
  isCountWu,
  isBeneficiaryHistory,
}) => {
  const { colors } = useTheme();
  const styles = transactionHistoryStyle(colors);
  const fullName = useTypedSelector((state) => state.walletInfoReducer.walletInfo.fullName);

  const multiTransactionTypes =
    (transaction?.transactionRequestType === TransactionTypes.COUT_SARIE ||
      transaction?.transactionRequestType === TransactionTypes.COUT_ALINMA ||
      transaction?.transactionRequestType === TransactionTypes.COUT_MOBILE ||
      transaction?.transactionRequestType === TransactionTypes.PAY_WALLET ||
      isCountWu ||
      isCountGift ||
      transaction?.transactionRequestType === TransactionTypes.PAYMENT_REQUEST ||
      transaction?.transactionRequestType === TransactionTypes.COUT_IPS) &&
    isDebit &&
    !isBeneficiaryHistory;

  return multiTransactionTypes ? (
    <IPayView style={styles.cardStyle}>
      <IPayFootnoteText
        regular
        style={styles.headingStyles}
        color={colors.natural.natural900}
        text="TRANSACTION_HISTORY.SENDER_NAME"
      />
      <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2} shouldTranslate={false}>
        {fullName}
      </IPaySubHeadlineText>
    </IPayView>
  ) : (
    <IPayView />
  );
};

const IPayShareableOtherView = ({
  showSplitButton,
  onPressPrint,
  onPressShare,
  isBeneficiaryHistory,
  onPressDownloadInvoice,
  transactionData,
}: any) => {
  const { colors } = useTheme();
  const styles = transactionHistoryStyle(colors);
  const { t } = useTranslation();

  return (
    <IPayView style={[styles.buttonWrapper, showSplitButton && styles.conditionButtonWrapper]}>
      {showSplitButton && (
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          btnText="TRANSACTION_HISTORY.SPLIT_BILL"
          medium
          btnStyle={[styles.button, showSplitButton && styles.conditionButton]}
          leftIcon={<IPayIcon icon={icons.bill1} size={18} color={colors.natural.natural0} />}
          onPress={onPressPrint}
        />
      )}
      {!isBeneficiaryHistory && (
        <IPayButton
          btnType={buttonVariants.OUTLINED}
          onPress={onPressShare}
          btnText={t('TOP_UP.SHARE')}
          medium
          btnStyle={[styles.button, showSplitButton && styles.conditionButton]}
          leftIcon={<IPayIcon icon={icons.share} size={18} color={colors.primary.primary500} />}
        />
      )}
      {transactionData?.showVatInvoice && (
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          btnText="TRANSACTION_HISTORY.VAT_INVOICE"
          medium
          btnStyle={styles.button}
          rightIcon={<IPayIcon icon={icons.export_2} size={18} color={colors.natural.natural0} />}
          onPress={onPressDownloadInvoice}
        />
      )}
    </IPayView>
  );
};

/**
 * A component consisting of transaction history object
 * @param {IPayTransactionProps} props - The props for the IPayTransactionItem component.
 */
const IPayTransactionHistory: React.FC<IPayTransactionProps> = ({
  testID,
  transaction,
  onCloseBottomSheet,
  isBeneficiaryHistory,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = transactionHistoryStyle(colors);
  const { showToast } = useToastContext();
  const transactionRequestType = transaction?.transactionRequestType;
  const [, setIsLoading] = useState<boolean>(false);
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const initiatedWallet = transaction?.walletTransactionStatus?.toLowerCase() === TransactionsStatus.INITIATED;
  const isCountMusaned = transactionRequestType === TransactionTypes.COUT_MUSANED ?? false;
  const isCredit = transaction?.transactionType === TransactionOperations.CREDIT ?? false;
  const isDebit = transaction?.transactionType === TransactionOperations.DEBIT ?? false;
  const isCountAtm = transactionRequestType === TransactionTypes.COUT_ATM ?? false;
  const isCountGift = transactionRequestType === TransactionTypes.COUT_GIFT ?? false;
  const isCardIssue = transactionRequestType === TransactionTypes.CARD_ISSUE ?? false;
  const isPayOneCard = transactionRequestType === TransactionTypes.PAY_ONECARD ?? false;
  const isCountWu = transactionRequestType === TransactionTypes.COUT_WU;
  const isCountExpress = transactionRequestType === TransactionTypes.COUT_EXPRESS ?? false;
  const isBKFTransfer = transactionRequestType === TransactionTypes.BKF_TRANSFER ?? false;
  const isPayBill = transactionRequestType === TransactionTypes.PAY_BILL ?? false;

  const showSplitButton = isPayBill || isCountExpress;
  const isNotPayVCardVisa = transactionRequestType !== TransactionTypes.PAY_VCARD_ECOM_VISA ?? false;

  const transactionJustification =
    transaction?.transactionDescription &&
    transaction?.transactionJustfication !== '0' &&
    transaction?.transactionJustfication !== '2';

  const renderToast = () => {
    showToast({
      title: t('TOP_UP.COPIED'),
      subTitle: '',
      containerStyle: isIosOS ? styles.containerToastIosStyle : styles.containerToastStyle,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      toastType: ToastTypes.SUCCESS,
    });
  };

  const getDate = (tisoDate?: any) => {
    const date = new Date(tisoDate)?.toISOString()?.replace(/T.*/, '')?.split('-').reverse().join('/');
    return `${formatSlashDateTime(tisoDate)} - ${date}` || '';
  };

  const copyRefNo = (value: string) => {
    copyText(value);
    renderToast(value);
  };

  const onPressShare = () => {
    if (onCloseBottomSheet) onCloseBottomSheet();
  };

  const onPressDownloadInvoice = async () => {
    setIsLoading(true);
    if (onCloseBottomSheet) onCloseBottomSheet();
    const payload: generateInvoiceProps = {
      walletNumber,
      trxId: transaction?.transactionRefNumber,
      trxDate: transaction?.transactionDateTime.split('T')[0],
    };

    const apiResponse: any = await generateInvoice(payload);

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      const pdfData = apiResponse?.response.invoice;

      const path = `${
        Platform.OS === 'android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath
      }/${apiResponse?.response?.docName}.pdf`;

      try {
        // Convert the ArrayBuffer to base64 string
        const contentType = 'application/pdf';

        const base64Data = atob(pdfData);
        await RNFS.writeFile(path, base64Data, 'base64');
        const fileExists = await RNFS.exists(path);

        if (fileExists) {
          if (Platform.OS === 'ios') {
            await Share.open({
              url: `file://${path}`,
              type: contentType,
              title: 'Open PDF',
            });
          }
        } else {
          return;
        }
      } catch (writeError) {
        return;
      }
    }
    setIsLoading(false);
  };

  const renderSubHeadline = (isStatic = false, text = '') => (
    <IPaySubHeadlineText
      style={isStatic ? {} : styles.fullFlex}
      regular
      color={colors.primary.primary800}
      numberOfLines={2}
    >
      {isStatic ? text : transaction?.transactionRequestTypeDesc}
    </IPaySubHeadlineText>
  );

  const renderHistory = (text = '', subText = '') => (
    <IPayView style={styles.cardStyle}>
      <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
        {text}
      </IPayFootnoteText>
      <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
        {subText}
      </IPaySubHeadlineText>
    </IPayView>
  );

  const renderFootnote = (text: string) => (
    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
      {text}
    </IPayFootnoteText>
  );

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayScrollView style={styles.scroll}>
        <IPayShareableImageView
          otherView={
            <IPayShareableOtherView
              isBKFTransfer={isBKFTransfer}
              isBeneficiaryHistory={isBeneficiaryHistory}
              onPressShare={onPressShare}
              onPressDownloadInvoice={onPressDownloadInvoice}
              showSplitButton={showSplitButton}
              transactionData={transaction}
            />
          }
        >
          <IPayView>
            <IPayView style={styles.amountSection}>
              <IPayFootnoteText color={colors.natural.natural900} text="TRANSACTION_HISTORY.AMOUNT" />
              <IPayTitle3Text
                style={[
                  styles.footnoteBoldTextStyle,
                  isCredit ? styles.footnoteGreenTextStyle : styles.footnoteRedTextStyle,
                ]}
                regular={false}
                shouldTranslate={false}
              >
                {`${isCredit ? '+' : '-'}${transaction?.amount} ${t('COMMON.SAR')}`}
              </IPayTitle3Text>
            </IPayView>
            <IPayView style={styles.listWrapper}>
              {isBeneficiaryHistory && (
                <IPayList
                  adjacentTitle={transaction?.bankName || ''}
                  title={transaction?.beneficiaryName || ''}
                  isShowLeftIcon
                  isShowSubTitle
                  textStyle={styles.beneficiaryTitleStyle}
                  subTitle={transaction?.iban || ''}
                  leftIcon={<IPayIcon icon={transaction?.bankId} size={24} />}
                />
              )}
              {!isBeneficiaryHistory && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.TYPE"
                  />
                  {initiatedWallet && !isCountGift && isNotPayVCardVisa && (
                    <IPaySubHeadlineText
                      regular
                      color={colors.primary.primary800}
                      numberOfLines={2}
                      text="TRANSACTION_HISTORY.AUTHORIZED"
                    />
                  )}
                  {!isCardIssue && !isPayOneCard && !isCountMusaned && renderSubHeadline()}
                  {isCardIssue && renderSubHeadline()}
                  {transactionRequestType === TransactionTypes.PAY_VCARD_REFUND_REV && renderSubHeadline()}
                  {transactionRequestType === TransactionTypes.CARD_VCB_REPLACE && renderSubHeadline()}
                  {transactionRequestType === TransactionTypes.CIN_VISA_CASHBACK && isCredit && renderSubHeadline()}
                  {transactionRequestType === TransactionTypes.CIN_VISA_CASHBACK_REV && isDebit && renderSubHeadline()}
                  {transactionRequestType === TransactionTypes.CIN_CASH_BACK && renderSubHeadline()}
                  {transactionRequestType === TransactionTypes.PAY_VCARD_REFUND && isCredit && renderSubHeadline()}
                  {transactionRequestType === TransactionTypes.CARD_VCB_ISSUE && isDebit && renderSubHeadline()}
                  {isCountMusaned && isCredit && renderSubHeadline(true, 'TRANSACTION_HISTORY.ONGOING_SALARY_TRANSFER')}
                  {isCountMusaned && isDebit && renderSubHeadline(true, 'TRANSACTION_HISTORY.OUTGOING_SALARY_TRANSFER')}
                  {isPayOneCard && isDebit && renderSubHeadline(true, transaction?.transactionRequestTypeDesc)}
                </IPayView>
              )}

              <MultiTransactions
                transaction={transaction}
                isDebit={isDebit}
                isCountGift={isCountGift}
                isCountWu={isCountWu}
                isBeneficiaryHistory={isBeneficiaryHistory}
              />
              {(transaction?.transactionRequestType === TransactionTypes.COUT_SARIE ||
                transaction?.transactionRequestType === TransactionTypes.COUT_ALINMA ||
                (isCountExpress && isBeneficiaryHistory)) && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.BENEFICIARY_NAME"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.beneficiaryName}
                  </IPaySubHeadlineText>
                </IPayView>
              )}
              {(transactionRequestType === TransactionTypes.COUT_ALINMA || (isBeneficiaryHistory && !isCredit)) && (
                <IPayView style={styles.cardStyle}>
                  {renderFootnote('TRANSACTION_HISTORY.BENEFICIARY_NICK_NAME')}
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.nickname}
                  </IPaySubHeadlineText>
                </IPayView>
              )}
              {(transactionRequestType === TransactionTypes.COUT_ALINMA || (isBeneficiaryHistory && isCredit)) && (
                <IPayView style={styles.cardStyle}>
                  {renderFootnote('TRANSACTION_HISTORY.SENDER_NICK_NAME')}
                  <IPaySubHeadlineText regular color={colors.primary.primary800}>
                    {transaction?.senderName?.length >= 18
                      ? `${transaction?.senderName?.slice(0, 18)}...`
                      : transaction?.senderName}
                  </IPaySubHeadlineText>
                </IPayView>
              )}
              {(transactionRequestType === TransactionTypes.COUT_ALINMA || isBeneficiaryHistory) && (
                <IPayView style={styles.cardStyle}>
                  {renderFootnote('TRANSACTION_HISTORY.TRANSFER_BY')}
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2} />
                </IPayView>
              )}
              {(transactionRequestType === TransactionTypes.COUT_ALINMA || isBeneficiaryHistory) && (
                <IPayView style={styles.cardStyle}>
                  {renderFootnote('TRANSACTION_HISTORY.REASON_OF_TRANSFER')}
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={1}
                    text={transaction?.transferPurpose}
                  />
                </IPayView>
              )}
              {isCountMusaned && isDebit && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.PAID_TO"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.beneficiaryName || transaction?.mobileNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType === 'Musaned.trxDetails.paidFrom' && isDebit && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.SENDER_NAME"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.nickname}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {isCountMusaned && isCredit && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.SENDER_NAME"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.senderName}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {(isCountWu || isCountExpress) && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.REFERENCE_NUMBER"
                  />
                  <IPayPressable
                    style={styles.actionWrapper}
                    onPress={() => copyRefNo(transaction?.remittanceRefNumber)}
                  >
                    <IPaySubHeadlineText
                      regular
                      color={colors.primary.primary800}
                      numberOfLines={2}
                      shouldTranslate={false}
                    >
                      {transaction?.remittanceRefNumber}
                    </IPaySubHeadlineText>

                    <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
                  </IPayPressable>
                </IPayView>
              )}

              {isCountExpress && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.REFERENCE_NUMBER"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRefNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {(transaction?.transactionRequestType === TransactionTypes.COUT_MOBILE ||
                transaction?.transactionRequestType === TransactionTypes.PAYMENT_REQUEST ||
                isCountGift ||
                (transaction?.transactionRequestType === TransactionTypes.PAY_WALLET && !isBeneficiaryHistory)) && (
                <IPayView style={styles.cardStyle}>
                  {isCredit && (
                    <IPayFootnoteText
                      regular
                      style={styles.headingStyles}
                      color={colors.natural.natural900}
                      text="TRANSACTION_HISTORY.SENDER"
                    />
                  )}
                  {isDebit && (
                    <IPayFootnoteText
                      regular
                      style={styles.headingStyles}
                      color={colors.natural.natural900}
                      text="TRANSACTION_HISTORY.RECEIVER"
                    />
                  )}
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType === TransactionTypes.REFUND && (
                <IPayView style={styles.cardStyle}>
                  {transaction?.TrnType === TransactionOperations.DEBIT && (
                    <IPayFootnoteText
                      regular
                      style={styles.headingStyles}
                      color={colors.natural.natural900}
                      text="TRANSACTION_HISTORY.PAY_FROM"
                    />
                  )}
                  {!(transaction?.TrnType === TransactionOperations.DEBIT) && (
                    <IPayFootnoteText
                      regular
                      style={styles.headingStyles}
                      color={colors.natural.natural900}
                      text="TRANSACTION_HISTORY.RECIVED_FROM"
                    />
                  )}
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.nickname}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.bankName && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.BANK_NAME"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.bankName}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.iban && !isCredit && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.IBAN"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.iban}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {(transaction?.transactionRequestType === TransactionTypes.PAY_MOI ||
                isPayBill ||
                transaction?.transactionRequestType === TransactionTypes.PAY_VCARD ||
                transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_POS ||
                transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_ECOM ||
                transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_SETTLE ||
                transaction?.transactionRequestType === TransactionTypes.CIN_CASH_BACK) && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.DESCRIPTION"
                  />
                  <IPaySubHeadlineText
                    style={styles.fullFlex}
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {isCountAtm && transaction?.terminalId && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.ATM_ID"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.terminalId}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType === TransactionTypes.COUT_ALINMA && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.ACCOUNT"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.iban}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {isCountAtm && transaction?.transactionRequestTypeDesc && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.ATM_DESCRIPTION"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {isCountMusaned && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.TOTAL_AMOUNT"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {`${transaction?.amount}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.bonusAmount && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.BONUS_AMOUNT"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {`${transaction?.bonusAmount}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {isCountMusaned && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.TRANSFER_TYPE"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionJustfication}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {isCountMusaned && transaction?.salaryMonth && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.MONTHLY_SALARY"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.salaryMonth}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionDescription &&
                transaction?.transactionJustfication !== '0' &&
                transaction?.transactionJustfication !== '2' && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText
                      regular
                      style={styles.headingStyles}
                      color={colors.natural.natural900}
                      text="TRANSACTION_HISTORY.NOTES"
                    />
                    <IPaySubHeadlineText
                      regular
                      color={colors.primary.primary800}
                      numberOfLines={2}
                      shouldTranslate={false}
                    >
                      {transaction?.transactionDescription}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType !== TransactionTypes.CIN_CARD_MADA &&
                !isPayOneCard &&
                (!isCredit || !isBeneficiaryHistory) && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText
                      regular
                      style={styles.headingStyles}
                      color={colors.natural.natural900}
                      text="TRANSACTION_HISTORY.FEES"
                    />
                    <IPaySubHeadlineText
                      regular
                      color={colors.primary.primary800}
                      numberOfLines={2}
                      shouldTranslate={false}
                    >
                      {`${transaction?.feesAmount || '0.00'}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType !== TransactionTypes.CIN_CARD_MADA &&
                !isPayOneCard &&
                (!isCredit || !isBeneficiaryHistory) && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText
                      regular
                      style={styles.headingStyles}
                      color={colors.natural.natural900}
                      text="TRANSACTION_HISTORY.VAT"
                    />
                    <IPaySubHeadlineText
                      regular
                      color={colors.primary.primary800}
                      numberOfLines={2}
                      shouldTranslate={false}
                    >
                      {`${transaction?.vatAmount || '0.00'}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType === TransactionTypes.PAY_ONECARD && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.AMOUNT"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {`${transaction?.amount}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transactionJustification ||
                (isBeneficiaryHistory &&
                  renderHistory('TRANSACTION_HISTORY.NOTES', transaction?.transactionDescription))}

              {isPayOneCard && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.ITEM_PRICE"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {`${transaction?.oneCardPriceBeforeVat}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {isPayOneCard && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.VAT"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {`${transaction?.oneCardVat}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {isPayOneCard && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.TOTAL"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {`${transaction?.oneCardPriceAfterVat}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {isCountWu && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.MTCN"
                  />
                  <IPayPressable style={styles.actionWrapper} onPress={() => copyRefNo(transaction?.mtcn)}>
                    <IPaySubHeadlineText
                      regular
                      color={colors.primary.primary800}
                      numberOfLines={2}
                      shouldTranslate={false}
                    >
                      {transaction?.mtcn}
                    </IPaySubHeadlineText>

                    <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
                  </IPayPressable>
                </IPayView>
              )}

              {isCountWu && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.REFERENCE_NUMBER"
                  />
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRefNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {!isCountWu && !isCountExpress && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText
                    regular
                    style={styles.headingStyles}
                    color={colors.natural.natural900}
                    text="TRANSACTION_HISTORY.REFERENCE_NUMBER"
                  />
                  <IPayPressable
                    style={styles.actionWrapper}
                    onPress={() => copyRefNo(transaction?.transactionRefNumber)}
                  >
                    <IPaySubHeadlineText
                      regular
                      color={colors.primary.primary800}
                      numberOfLines={2}
                      shouldTranslate={false}
                    >
                      {transaction?.transactionRefNumber}
                    </IPaySubHeadlineText>

                    <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
                  </IPayPressable>
                </IPayView>
              )}
              {isBeneficiaryHistory &&
                !isCredit &&
                renderHistory(
                  'TRANSACTION_HISTORY.TOTAL_AMOUNT',
                  `${transaction?.amount}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`,
                )}
              {!isBeneficiaryHistory &&
                transaction?.cardNumber &&
                renderHistory('TRANSACTION_HISTORY.CARD_NUMBER', transaction?.cardNumber || '')}
              {!isBeneficiaryHistory &&
                renderHistory('TRANSACTION_HISTORY.DATE_AND_TIME', getDate(transaction?.transactionDateTime || ''))}
            </IPayView>
          </IPayView>
        </IPayShareableImageView>
      </IPayScrollView>
    </IPayView>
  );
};

export default IPayTransactionHistory;
