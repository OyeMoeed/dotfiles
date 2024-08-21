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
import {
  CopiableKeys,
  KeysToProcess,
  LocalizationKeys,
  TransactionOperations,
  TransactionTypes,
} from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { BeneficiaryTransactionItemProps } from '@app/screens/beneficiary-transaction-history/beneficiary-transaction-history.interface';
import { IPayTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { isIosOS } from '@app/utilities/constants';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import React, { useState } from 'react';
import { IPayTransactionProps } from './ipay-transaction-history.interface';
import transactionHistoryStyle from './ipay-transaction-history.style';

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
  const localizationText = useLocalization();
  const styles = transactionHistoryStyle(colors);
  const [isShareable, setIsShareable] = useState<boolean>(false);
  const applyLocalizationKeys: (keyof IPayTransactionItemProps)[] = [LocalizationKeys.TRANSACTION_TYPE];
  const copiableItems: (keyof IPayTransactionItemProps)[] = [CopiableKeys.REF_NUMBER];
  const transferByKey: (keyof BeneficiaryTransactionItemProps)[] = [KeysToProcess.TRANSFER_BY];
  const { showToast } = useToastContext();
  const calculatedVatPercentage = '15%'; // update with real value
  const showSplitButton =
    transaction?.transactionRequestType === TransactionTypes.PAY_BILL ||
    transaction?.transactionRequestType === TransactionTypes.COUT_EXPRESS;
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);

  const renderToast = (value: string) => {
    showToast({
      title: localizationText.TOP_UP.COPIED,
      subTitle: value,
      containerStyle: isIosOS ? styles.containerToastIosStyle : styles.containerToastStyle,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      toastType: 'success',
    });
  };

  const getDate = (tisoDate?: any): string => {
    const date = new Date(tisoDate).toISOString().replace(/T.*/, '').split('-').reverse().join('-');

    return `${date} | ${formatTimeAMPM(tisoDate)}`;
  };

  const formatTimeAMPM = (tisoDate?: any): string => {
    const date = new Date(tisoDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let strMin: string | number;
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    strMin = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + strMin + ' ' + ampm;
    return strTime;
  };

  const copyRefNo = (value: string) => {
    copyText(value);
    renderToast(value);
  };

  const onPressPrint = () => {
    setIsShareable(false);
  };

  const onPressShare = () => {
    console.log(transaction);
    setIsShareable(true);
    if (onCloseBottomSheet) onCloseBottomSheet();
  };

  const renderItem = (field: keyof IPayTransactionItemProps, index: number) => {
    console.log('field');
    console.log(field);
    let value = transaction[field];
    if (field === KeysToProcess.TRANSACTION_DATE) {
      value = formatDateAndTime(transaction.transactionDateTime, dateTimeFormat.TimeAndDate);
    }

    return (
      <IPayView style={styles.cardStyle} key={index}>
        <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
          {field}
        </IPayFootnoteText>
        <IPayPressable
          style={styles.actionWrapper}
          disabled={!copiableItems?.includes(field)}
          onPress={() => copyRefNo(value)}
        >
          {
            <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
              {value}
            </IPaySubHeadlineText>
          }
          {copiableItems?.includes(field) ? (
            <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
          ) : (
            <IPayView />
          )}
        </IPayPressable>
      </IPayView>
    );
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayScrollView>
        <IPayShareableImageView
          isShareable={isShareable}
          otherView={
            <IPayView style={[styles.buttonWrapper, showSplitButton && styles.conditionButtonWrapper]}>
              {showSplitButton && (
                <IPayButton
                  btnType="primary"
                  btnText={localizationText.TRANSACTION_HISTORY.SPLIT_BILL}
                  medium
                  btnStyle={[styles.button, showSplitButton && styles.conditionButton]}
                  leftIcon={<IPayIcon icon={icons.bill1} size={18} color={colors.natural.natural0} />}
                  onPress={onPressPrint}
                />
              )}
              {!isBeneficiaryHistory && (
                <IPayButton
                  btnType="outline"
                  onPress={onPressShare}
                  btnText={localizationText.TOP_UP.SHARE}
                  medium
                  btnStyle={[styles.button, showSplitButton && styles.conditionButton]}
                  leftIcon={<IPayIcon icon={icons.share} size={18} color={colors.primary.primary500} />}
                />
              )}
              {transaction.transactionRequestType === TransactionTypes.BKF_TRANSFER && (
                <IPayButton
                  btnType="primary"
                  btnText={localizationText.TRANSACTION_HISTORY.VAT_INVOICE}
                  medium
                  btnStyle={styles.button}
                  rightIcon={<IPayIcon icon={icons.export_2} size={18} color={colors.natural.natural0} />}
                  onPress={() => {}}
                />
              )}
            </IPayView>
          }
        >
          <IPayView>
            <IPayView style={styles.amountSection}>
              <IPayFootnoteText color={colors.natural.natural900}>
                {localizationText.TRANSACTION_HISTORY.AMOUNT}
              </IPayFootnoteText>
              <IPayTitle3Text
                style={[
                  styles.footnoteBoldTextStyle,
                  transaction?.transactionType === TransactionOperations.CREDIT
                    ? styles.footnoteGreenTextStyle
                    : styles.footnoteRedTextStyle,
                ]}
                regular={false}
              >
                {`${transaction?.transactionType === TransactionOperations.CREDIT ? '+' : '-'}${transaction?.amount} SAR`}
              </IPayTitle3Text>
            </IPayView>
            <IPayView style={styles.listWrapper}>
              {isBeneficiaryHistory && (
                <IPayList
                  adjacentTitle={transaction.bankName || ''}
                  title={transaction.name || ''}
                  isShowLeftIcon
                  isShowSubTitle
                  textStyle={styles.beneficiaryTitleStyle}
                  subTitle={transaction.bank_account_no || ''}
                  leftIcon={
                    <IPayImage
                      resizeMode="contain"
                      style={styles.beneficiaryLeftImage}
                      image={transaction.bankImage || images.nationalBankLogo}
                    />
                  }
                />
              )}
              {/* {transaction &&
                Object.keys(transaction)
                  // .filter((key) => typeFieldMapping[transaction.transactionRequestType]?.includes(key))
                  .map((field: string, index: number) => renderItem(field as keyof IPayTransactionItemProps, index))} */}

              <IPayView style={styles.cardStyle}>
                <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                  {localizationText.TRANSACTION_HISTORY.TYPE}
                </IPayFootnoteText>
                {transaction?.walletTransactionStatus.toLowerCase() == 'initiated' &&
                  transaction?.transactionRequestType != TransactionTypes.COUT_GIFT &&
                  transaction?.transactionRequestType != TransactionTypes.PAY_VCARD_ECOM_VISA && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {localizationText.TRANSACTION_HISTORY.AUTHORIZED}
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType != TransactionTypes.CARD_ISSUE &&
                  transaction?.transactionRequestType != TransactionTypes.PAY_ONECARD &&
                  transaction?.transactionRequestType != TransactionTypes.COUT_MUSANED && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionRequestTypeDesc}
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType == TransactionTypes.CARD_ISSUE && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == TransactionTypes.PAY_VCARD_REFUND_REV && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == TransactionTypes.CARD_VCB_REPLACE && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == TransactionTypes.CIN_VISA_CASHBACK &&
                  transaction?.transactionType == TransactionOperations.CREDIT && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionRequestTypeDesc}
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType == TransactionTypes.CIN_VISA_CASHBACK_REV &&
                  transaction?.transactionType == TransactionOperations.DEBIT && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionRequestTypeDesc}
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType == TransactionTypes.CIN_CASH_BACK && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == TransactionTypes.PAY_VCARD_REFUND &&
                  transaction?.transactionType == TransactionOperations.CREDIT && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionRequestTypeDesc}
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType == TransactionTypes.CARD_VCB_ISSUE &&
                  transaction?.transactionType == TransactionOperations.DEBIT && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionRequestTypeDesc}
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType == TransactionTypes.COUT_MUSANED &&
                  transaction?.transactionType == TransactionOperations.CREDIT && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {localizationText.TRANSACTION_HISTORY.ONGOING_SALARY_TRANSFER}
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType == TransactionTypes.COUT_MUSANED &&
                  transaction?.transactionType == TransactionOperations.DEBIT && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {localizationText.TRANSACTION_HISTORY.OUTGOING_SALARY_TRANSFER}
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType == TransactionTypes.PAY_ONECARD &&
                  transaction?.transactionType == TransactionOperations.DEBIT && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionRequestTypeDesc}
                    </IPaySubHeadlineText>
                  )}
              </IPayView>

              {(transaction?.transactionRequestType == TransactionTypes.COUT_SARIE ||
                transaction?.transactionRequestType == TransactionTypes.COUT_ALINMA ||
                transaction?.transactionRequestType == TransactionTypes.COUT_MOBILE ||
                transaction?.transactionRequestType == TransactionTypes.PAY_WALLET ||
                transaction?.transactionRequestType == TransactionTypes.COUT_WU ||
                transaction?.transactionRequestType == TransactionTypes.COUT_GIFT ||
                transaction?.transactionRequestType == TransactionTypes.PAYMENT_REQUEST ||
                transaction?.transactionRequestType == TransactionTypes.COUT_IPS) &&
                transaction?.transactionType === TransactionOperations.DEBIT && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.SENDER_NAME}
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {userInfo?.fullName}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {(transaction?.transactionRequestType == TransactionTypes.COUT_SARIE ||
                transaction?.transactionRequestType == TransactionTypes.COUT_ALINMA ||
                transaction?.transactionRequestType == TransactionTypes.COUT_EXPRESS) && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.BENEFICIARY_NAME}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.beneficiaryName}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == TransactionTypes.COUT_MUSANED &&
                transaction?.transactionType == TransactionOperations.DEBIT && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.PAID_TO}
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.beneficiaryName || transaction?.mobileNumber}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType == 'Musaned.trxDetails.paidFrom' &&
                transaction?.transactionType == TransactionOperations.DEBIT && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.SENDER_NAME}
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.nickname}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType == TransactionTypes.COUT_MUSANED &&
                transaction?.transactionType == TransactionOperations.CREDIT && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.SENDER_NAME}
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.senderName}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {(transaction?.transactionRequestType == TransactionTypes.COUT_WU ||
                transaction?.transactionRequestType == TransactionTypes.COUT_EXPRESS) && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.REFERENCE_NUMBER}
                  </IPayFootnoteText>
                  <IPayPressable
                    style={styles.actionWrapper}
                    disabled={!false}
                    onPress={() => copyRefNo(transaction?.remittanceRefNumber)}
                  >
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.remittanceRefNumber}
                    </IPaySubHeadlineText>

                    <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
                  </IPayPressable>
                </IPayView>
              )}

              {transaction?.transactionRequestType == TransactionTypes.COUT_EXPRESS && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.REFERENCE_NUMBER}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRefNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {(transaction?.transactionRequestType == TransactionTypes.COUT_MOBILE ||
                transaction?.transactionRequestType == TransactionTypes.PAYMENT_REQUEST ||
                transaction?.transactionRequestType == TransactionTypes.COUT_GIFT ||
                transaction?.transactionRequestType == TransactionTypes.PAY_WALLET) && (
                <IPayView style={styles.cardStyle}>
                  {transaction?.transactionType === TransactionOperations.CREDIT && (
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.PAY_FROM}
                    </IPayFootnoteText>
                  )}
                  {transaction?.transactionType === TransactionOperations.DEBIT && (
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.PAY_TO}
                    </IPayFootnoteText>
                  )}
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == TransactionTypes.REFUND && (
                <IPayView style={styles.cardStyle}>
                  {transaction?.TrnType == TransactionOperations.DEBIT && (
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.PAY_FROM}
                    </IPayFootnoteText>
                  )}
                  {!(transaction?.TrnType == TransactionOperations.DEBIT) && (
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.RECIVED_FROM}
                    </IPayFootnoteText>
                  )}
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.nickname}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.bankName && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.BANK_NAME}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.bankName}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.iban && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.IBAN}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.iban}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {(transaction?.transactionRequestType == TransactionTypes.PAY_MOI ||
                transaction?.transactionRequestType == TransactionTypes.PAY_BILL ||
                transaction?.transactionRequestType == TransactionTypes.PAY_VCARD ||
                transaction?.transactionRequestType == TransactionTypes.PAY_VCARD_POS ||
                transaction?.transactionRequestType == TransactionTypes.PAY_VCARD_ECOM ||
                transaction?.transactionRequestType == TransactionTypes.PAY_VCARD_SETTLE ||
                transaction?.transactionRequestType == TransactionTypes.CIN_CASH_BACK) && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.DESCRIPTION}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == TransactionTypes.COUT_ATM && transaction?.terminalId && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.ATM_ID}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.terminalId}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == TransactionTypes.COUT_ALINMA && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.ACCOUNT}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.iban}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == TransactionTypes.COUT_ATM &&
                transaction?.transactionRequestTypeDesc && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.ATM_DESCRIPTION}
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionRequestTypeDesc}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType == TransactionTypes.COUT_MUSANED && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.TOTAL_AMOUNT}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.amount + '  ' + localizationText.TRANSACTION_HISTORY.SAUDI_RIYAL}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.bonusAmount && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.BONUS_AMOUNT}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.bonusAmount + '  ' + localizationText.TRANSACTION_HISTORY.SAUDI_RIYAL}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == TransactionTypes.COUT_MUSANED && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.TRANSFER_TYPE}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionJustfication}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == TransactionTypes.COUT_MUSANED && transaction?.salaryMonth && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.MONTHLY_SALARY}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.salaryMonth}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType != TransactionTypes.PAY_ONECARD &&
                transaction?.transactionRequestType != TransactionTypes.COUT_MUSANED && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.AMOUNT}
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.amount + '  ' + localizationText.TRANSACTION_HISTORY.SAUDI_RIYAL}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionDescription &&
                transaction?.transactionJustfication != '0' &&
                transaction?.transactionJustfication != '2' && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.NOTES}
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionDescription}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType !== TransactionTypes.CIN_CARD_MADA &&
                transaction?.transactionRequestType !== TransactionTypes.PAY_ONECARD && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.FEES}
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.feesAmount + '  ' + localizationText.TRANSACTION_HISTORY.SAUDI_RIYAL}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType !== TransactionTypes.CIN_CARD_MADA &&
                transaction?.transactionRequestType !== TransactionTypes.PAY_ONECARD && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.VAT}
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.vatAmount + '  ' + localizationText.TRANSACTION_HISTORY.SAUDI_RIYAL}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType == TransactionTypes.PAY_ONECARD && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.ITEM_PRICE}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.oneCardPriceBeforeVat + '  ' + localizationText.TRANSACTION_HISTORY.SAUDI_RIYAL}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == TransactionTypes.PAY_ONECARD && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.VAT}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.oneCardVat + '  ' + localizationText.TRANSACTION_HISTORY.SAUDI_RIYAL}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == TransactionTypes.PAY_ONECARD && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.TOTAL}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.oneCardPriceAfterVat + '  ' + localizationText.TRANSACTION_HISTORY.SAUDI_RIYAL}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType === TransactionTypes.COUT_WU && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.MTCN}
                  </IPayFootnoteText>
                  <IPayPressable
                    style={styles.actionWrapper}
                    disabled={!false}
                    onPress={() => copyRefNo(transaction?.mtcn)}
                  >
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.mtcn}
                    </IPaySubHeadlineText>

                    <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
                  </IPayPressable>
                </IPayView>
              )}

              {transaction?.transactionRequestType === TransactionTypes.COUT_WU && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    {localizationText.TRANSACTION_HISTORY.REFERENCE_NUMBER}
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRefNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType !== TransactionTypes.COUT_WU &&
                transaction?.transactionRequestType !== TransactionTypes.COUT_EXPRESS && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      {localizationText.TRANSACTION_HISTORY.REFERENCE_NUMBER}
                    </IPayFootnoteText>
                    <IPayPressable
                      style={styles.actionWrapper}
                      disabled={!false}
                      onPress={() => copyRefNo(transaction?.transactionRefNumber)}
                    >
                      <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                        {transaction?.transactionRefNumber}
                      </IPaySubHeadlineText>

                      <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
                    </IPayPressable>
                  </IPayView>
                )}

              <IPayView style={styles.cardStyle}>
                <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                  {localizationText.TRANSACTION_HISTORY.DATE_AND_TIME}
                </IPayFootnoteText>
                <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                  {getDate(transaction?.transactionDateTime)}
                </IPaySubHeadlineText>
              </IPayView>
            </IPayView>
          </IPayView>
        </IPayShareableImageView>
      </IPayScrollView>
    </IPayView>
  );
};

export default IPayTransactionHistory;
