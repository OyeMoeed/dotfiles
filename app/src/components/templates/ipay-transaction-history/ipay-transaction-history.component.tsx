// TODO: Fix max function for this file and indent
/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayTitle3Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayList, IPayShareableImageView } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { isIosOS } from '@app/utilities/constants';
import { buttonVariants } from '@app/utilities/enums.util';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { IPayTransactionProps, MultiTransactionsProps } from './ipay-transaction-history.interface';
import transactionHistoryStyle from './ipay-transaction-history.style';

const MultiTransactions: React.FC<MultiTransactionsProps> = ({ transaction, isDebit, isCountGift, isCountWu }) => {
  const { colors } = useTheme();
  const styles = transactionHistoryStyle(colors);
  const { fullName } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const multiTransactionTypes =
    (transaction?.transactionRequestType === TransactionTypes.COUT_SARIE ||
      transaction?.transactionRequestType === TransactionTypes.COUT_ALINMA ||
      transaction?.transactionRequestType === TransactionTypes.COUT_MOBILE ||
      transaction?.transactionRequestType === TransactionTypes.PAY_WALLET ||
      isCountWu ||
      isCountGift ||
      transaction?.transactionRequestType === TransactionTypes.PAYMENT_REQUEST ||
      transaction?.transactionRequestType === TransactionTypes.COUT_IPS) &&
    isDebit;

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
  isBKFTransfer,
}) => {
  const { colors } = useTheme();
  const styles = transactionHistoryStyle(colors);

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
          btnText="TOP_UP.SHARE"
          medium
          btnStyle={[styles.button, showSplitButton && styles.conditionButton]}
          leftIcon={<IPayIcon icon={icons.share} size={18} color={colors.primary.primary500} />}
        />
      )}
      {isBKFTransfer && (
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          btnText="TRANSACTION_HISTORY.VAT_INVOICE"
          medium
          btnStyle={styles.button}
          rightIcon={<IPayIcon icon={icons.export_2} size={18} color={colors.natural.natural0} />}
          onPress={() => {}}
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
  const [isShareable, setIsShareable] = useState<boolean>(false);
  const { showToast } = useToastContext();

  const initiatedWallet = transaction?.walletTransactionStatus?.toLowerCase() === 'initiated';
  const isCountMusaned = transaction?.transactionRequestType === TransactionTypes.COUT_MUSANED;
  const isCredit = transaction?.transactionType === TransactionOperations.CREDIT;
  const isDebit = transaction?.transactionType === TransactionOperations.DEBIT;
  const isCountAtm = transaction?.transactionRequestType === TransactionTypes.COUT_ATM;
  const isCountGift = transaction?.transactionRequestType === TransactionTypes.COUT_GIFT;
  const isCardIssue = transaction?.transactionRequestType === TransactionTypes.CARD_ISSUE;
  const isPayOneCard = transaction?.transactionRequestType === TransactionTypes.PAY_ONECARD;
  const isCountWu = transaction?.transactionRequestType === TransactionTypes.COUT_WU;
  const isCountExpress = transaction?.transactionRequestType === TransactionTypes.COUT_EXPRESS;
  const isBKFTransfer = transaction?.transactionRequestType === TransactionTypes.BKF_TRANSFER;
  const isPayBill = transaction?.transactionRequestType === TransactionTypes.PAY_BILL;

  const showSplitButton = isPayBill || isCountExpress;
  const isNotPayVCardVisa = transaction?.transactionRequestType !== TransactionTypes.PAY_VCARD_ECOM_VISA;

  const transactionJustification =
    transaction?.transactionDescription &&
    transaction?.transactionJustfication !== '0' &&
    transaction?.transactionJustfication !== '2';

  const renderToast = (value: string) => {
    showToast({
      title: t('TOP_UP.COPIED'),
      subTitle: value,
      containerStyle: isIosOS ? styles.containerToastIosStyle : styles.containerToastStyle,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      toastType: 'success',
    });
  };

  const formatTimeAMPM = (tisoDate?: any): string => {
    const date = new Date(tisoDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let strMin: string | number = '';
    strMin = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${strMin}`;
    return strTime;
  };

  const getDate = (tisoDate?: any): string => {
    const date = new Date(tisoDate).toISOString().replace(/T.*/, '').split('-').reverse().join('/');
    return `${formatTimeAMPM(tisoDate)} - ${date}`;
  };

  const copyRefNo = (value: string) => {
    copyText(value);
    renderToast(value);
  };

  const onPressPrint = () => {
    setIsShareable(false);
  };

  const onPressShare = () => {
    setIsShareable(true);
    if (onCloseBottomSheet) onCloseBottomSheet();
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayScrollView>
        <IPayShareableImageView
          isShareable={isShareable}
          otherView={
            <IPayShareableOtherView
              isBKFTransfer={isBKFTransfer}
              isBeneficiaryHistory={isBeneficiaryHistory}
              onPressPrint={onPressPrint}
              onPressShare={onPressShare}
              showSplitButton={showSplitButton}
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
                {`${isCredit ? '+' : '-'}${transaction?.amount} SAR`}
              </IPayTitle3Text>
            </IPayView>
            <IPayView style={styles.listWrapper}>
              {isBeneficiaryHistory && (
                <IPayList
                  adjacentTitle={transaction?.bankName || ''}
                  title={transaction?.name || ''}
                  isShowLeftIcon
                  isShowSubTitle
                  textStyle={styles.beneficiaryTitleStyle}
                  subTitle={transaction?.bank_account_no || ''}
                  leftIcon={
                    <IPayImage
                      resizeMode="contain"
                      style={styles.beneficiaryLeftImage}
                      image={transaction?.bankImage || images.nationalBankLogo}
                    />
                  }
                />
              )}
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
                {!isCardIssue && !isPayOneCard && !isCountMusaned && (
                  <IPaySubHeadlineText
                    style={styles.fullFlex}
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {isCardIssue && (
                  <IPaySubHeadlineText
                    style={styles.fullFlex}
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_REFUND_REV && (
                  <IPaySubHeadlineText
                    style={styles.fullFlex}
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType === TransactionTypes.CARD_VCB_REPLACE && (
                  <IPaySubHeadlineText
                    style={styles.fullFlex}
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType === TransactionTypes.CIN_VISA_CASHBACK && isCredit && (
                  <IPaySubHeadlineText
                    style={styles.fullFlex}
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType === TransactionTypes.CIN_VISA_CASHBACK_REV && isDebit && (
                  <IPaySubHeadlineText
                    style={styles.fullFlex}
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType === TransactionTypes.CIN_CASH_BACK && (
                  <IPaySubHeadlineText
                    style={styles.fullFlex}
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType === TransactionTypes.PAY_VCARD_REFUND && isCredit && (
                  <IPaySubHeadlineText
                    style={styles.fullFlex}
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType === TransactionTypes.CARD_VCB_ISSUE && isDebit && (
                  <IPaySubHeadlineText
                    style={styles.fullFlex}
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {isCountMusaned && isCredit && (
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    text="TRANSACTION_HISTORY.ONGOING_SALARY_TRANSFER"
                  />
                )}
                {isCountMusaned && isDebit && (
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    text="TRANSACTION_HISTORY.OUTGOING_SALARY_TRANSFER"
                  />
                )}
                {isPayOneCard && isDebit && (
                  <IPaySubHeadlineText
                    regular
                    color={colors.primary.primary800}
                    numberOfLines={2}
                    shouldTranslate={false}
                  >
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
              </IPayView>

              <MultiTransactions
                transaction={transaction}
                isDebit={isDebit}
                isCountGift={isCountGift}
                isCountWu={isCountWu}
              />
              {(transaction?.transactionRequestType === TransactionTypes.COUT_SARIE ||
                transaction?.transactionRequestType === TransactionTypes.COUT_ALINMA ||
                isCountExpress) && (
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
                transaction?.transactionRequestType === TransactionTypes.PAY_WALLET) && (
                <IPayView style={styles.cardStyle}>
                  {isCredit && (
                    <IPayFootnoteText
                      regular
                      style={styles.headingStyles}
                      color={colors.natural.natural900}
                      text="TRANSACTION_HISTORY.PAY_FROM"
                    />
                  )}
                  {isDebit && (
                    <IPayFootnoteText
                      regular
                      style={styles.headingStyles}
                      color={colors.natural.natural900}
                      text="TRANSACTION_HISTORY.PAY_TO"
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

              {transaction?.iban && (
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

              {!isPayOneCard && !isCountMusaned && (
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
                transaction?.transactionRequestType !== TransactionTypes.PAY_ONECARD && (
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
                transaction?.transactionRequestType !== TransactionTypes.PAY_ONECARD && (
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

              {transactionJustification && (
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

              {transaction?.transactionRequestType !== TransactionTypes.CIN_CARD_MADA && !isPayOneCard && (
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
                    {`${transaction?.feesAmount || ''}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType !== TransactionTypes.CIN_CARD_MADA && !isPayOneCard && (
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
                    {`${transaction?.vatAmount || ''}  ${t('TRANSACTION_HISTORY.SAUDI_RIYAL')}`}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

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

              {/* {transaction?.transactionRequestType !== TransactionTypes.PAY_WALLET &&
                transaction?.transactionType === TransactionOperations.DEBIT && ( */}
              <IPayView style={styles.cardStyle}>
                <IPayFootnoteText
                  regular
                  style={styles.headingStyles}
                  color={colors.natural.natural900}
                  text="TRANSACTION_HISTORY.DATE_AND_TIME"
                />
                <IPaySubHeadlineText
                  regular
                  color={colors.primary.primary800}
                  numberOfLines={2}
                  shouldTranslate={false}
                >
                  {getDate(transaction?.transactionDateTime)}
                </IPaySubHeadlineText>
              </IPayView>
              {/* )} */}
            </IPayView>
          </IPayView>
        </IPayShareableImageView>
      </IPayScrollView>
    </IPayView>
  );
};

export default IPayTransactionHistory;
