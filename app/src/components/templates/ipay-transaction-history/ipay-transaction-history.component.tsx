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
  LocalizationKeysMapping,
  TransactionOperations,
  TransactionTypes,
} from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { BeneficiaryTransactionItemProps } from '@app/screens/beneficiary-transaction-history/beneficiary-transaction-history.interface';
import { IPayTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { isIosOS } from '@app/utilities/constants';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import React, { useState } from 'react';
import { typeFieldMapping } from './ipay-transaction-history.constant';
import { IPayTransactionProps } from './ipay-transaction-history.interface';
import transactionHistoryStyle from './ipay-transaction-history.style';
import { useTypedSelector } from '@app/store/store';

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

    const date = new Date(tisoDate).toISOString().replace(/T.*/, '').split('-').reverse().join('-')

    return `${date} | ${formatTimeAMPM(tisoDate)}`
  }

  const formatTimeAMPM = (tisoDate?: any): string =>  {
    const date = new Date(tisoDate)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let strMin: string | number;
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    strMin = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + strMin + ' ' + ampm;
    return strTime;
  }

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
          { (
            <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
              {value}
            </IPaySubHeadlineText>
          )}
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
                  Type
                </IPayFootnoteText>
                {transaction?.walletTransactionStatus.toLowerCase() == 'initiated' &&
                  transaction?.transactionRequestType != 'COUT_GIFT' &&
                  transaction?.transactionRequestType != 'PAY_VCARD_ECOM_VISA' && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      Authorized
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType != 'CARD_ISSUE' &&
                  transaction?.transactionRequestType != 'PAY_ONECARD' &&
                  transaction?.transactionRequestType != 'COUT_MUSANED' && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionRequestTypeDesc}
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType == 'CARD_ISSUE' && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == 'PAY_VCARD_REFUND_REV' && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == 'CARD_VCB_REPLACE' && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == 'CIN_VISA_CASHBACK' && transaction?.transactionType == 'CR' && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == 'CIN_VISA_CASHBACK_REV' &&
                  transaction?.transactionType == 'DR' && (
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionRequestTypeDesc}
                    </IPaySubHeadlineText>
                  )}
                {transaction?.transactionRequestType == 'CIN_CASH_BACK' && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == 'PAY_VCARD_REFUND' && transaction?.transactionType == 'CR' && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == 'CARD_VCB_ISSUE' && transaction?.transactionType == 'DR' && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == 'COUT_MUSANED' && transaction?.transactionType == 'CR' && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {'Ongoing Salary Transfer'}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == 'COUT_MUSANED' && transaction?.transactionType == 'DR' && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {'Outgoing Salary Transfer'}
                  </IPaySubHeadlineText>
                )}
                {transaction?.transactionRequestType == 'PAY_ONECARD' && transaction?.transactionType == 'DR' && (
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                )}
              </IPayView>

              {(transaction?.transactionRequestType == 'COUT_SARIE' ||
                transaction?.transactionRequestType == 'COUT_ALINMA' ||
                transaction?.transactionRequestType == 'COUT_MOBILE' ||
                transaction?.transactionRequestType == 'PAY_WALLET' ||
                transaction?.transactionRequestType == 'COUT_WU' ||
                transaction?.transactionRequestType == 'COUT_GIFT' ||
                transaction?.transactionRequestType == 'PAYMENT_REQUEST' ||
                transaction?.transactionRequestType == 'COUT_IPS') &&
                transaction?.transactionType === 'DR' && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      Sender name
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {userInfo?.fullName}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {(transaction?.transactionRequestType == 'COUT_SARIE' ||
                transaction?.transactionRequestType == 'COUT_ALINMA' ||
                transaction?.transactionRequestType == 'COUT_EXPRESS') && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Beneficiary name
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.beneficiaryName}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'COUT_MUSANED' && transaction?.transactionType == 'DR' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Paid to
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.beneficiaryName || transaction?.mobileNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'Musaned.trxDetails.paidFrom' &&
                transaction?.transactionType == 'DR' && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      Sender name
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.nickname}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType == 'COUT_MUSANED' && transaction?.transactionType == 'CR' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Sender name
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.senderName}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {(transaction?.transactionRequestType == 'COUT_WU' ||
                transaction?.transactionRequestType == 'COUT_EXPRESS') && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Reference number
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

              {transaction?.transactionRequestType == 'COUT_EXPRESS' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Reference number
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRefNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {(transaction?.transactionRequestType == 'COUT_MOBILE' ||
                transaction?.transactionRequestType == 'PAYMENT_REQUEST' ||
                transaction?.transactionRequestType == 'COUT_GIFT' ||
                transaction?.transactionRequestType == 'PAY_WALLET') && (
                <IPayView style={styles.cardStyle}>
                  {transaction?.transactionType === 'CR' && (
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      Pay from
                    </IPayFootnoteText>
                  )}
                  {transaction?.transactionType === 'DR' && (
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      Pay to
                    </IPayFootnoteText>
                  )}
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.beneficiaryName || transaction?.nickname || transaction?.mobileNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'REFUND' && (
                <IPayView style={styles.cardStyle}>
                  {transaction?.TrnType == 'DR' && (
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      Pay from
                    </IPayFootnoteText>
                  )}
                  {!(transaction?.TrnType == 'DR') && (
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      Recived from
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
                    Bank Name
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.bankName}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.iban && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    IBAN
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.iban}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {(transaction?.transactionRequestType == 'PAY_MOI' ||
                transaction?.transactionRequestType == 'PAY_BILL' ||
                transaction?.transactionRequestType == 'PAY_VCARD' ||
                transaction?.transactionRequestType == 'PAY_VCARD_POS' ||
                transaction?.transactionRequestType == 'PAY_VCARD_ECOM' ||
                transaction?.transactionRequestType == 'PAY_VCARD_SETTLE' ||
                transaction?.transactionRequestType == 'CIN_CASH_BACK') && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Description
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'COUT_ATM' && transaction?.terminalId && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    ATM ID/number
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.terminalId}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'COUT_ALINMA' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Account
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.iban}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'COUT_ATM' && transaction?.transactionRequestTypeDesc && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    ATM description
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRequestTypeDesc}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'COUT_MUSANED' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Total amount
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.amount + ' Saudi riyal'}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.bonusAmount && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Bonus Amount
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.bonusAmount + ' Saudi riyal'}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'COUT_MUSANED' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Transfer type
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionJustfication}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'COUT_MUSANED' && transaction?.salaryMonth && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Salary month
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.salaryMonth}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType != 'PAY_ONECARD' &&
                transaction?.transactionRequestType != 'COUT_MUSANED' && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      Amount
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.amount + ' Saudi riyal'}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionDescription &&
                transaction?.transactionJustfication != '0' &&
                transaction?.transactionJustfication != '2' && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      Notes
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.transactionDescription}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType !== 'CIN_CARD_MADA' &&
                transaction?.transactionRequestType !== 'PAY_ONECARD' && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      Fees
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.feesAmount + ' Saudi riyal'}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType !== 'CIN_CARD_MADA' &&
                transaction?.transactionRequestType !== 'PAY_ONECARD' && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      VAT
                    </IPayFootnoteText>
                    <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                      {transaction?.vatAmount + ' Saudi riyal'}
                    </IPaySubHeadlineText>
                  </IPayView>
                )}

              {transaction?.transactionRequestType == 'PAY_ONECARD' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Item price
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.oneCardPriceBeforeVat + ' Saudi riyal'}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'PAY_ONECARD' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    VAT
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.oneCardVat + ' Saudi riyal'}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType == 'PAY_ONECARD' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Total
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.oneCardPriceAfterVat + ' Saudi riyal'}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType === 'COUT_WU' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    MTCN
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

              {transaction?.transactionRequestType === 'COUT_WU' && (
                <IPayView style={styles.cardStyle}>
                  <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                    Reference number
                  </IPayFootnoteText>
                  <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={2}>
                    {transaction?.transactionRefNumber}
                  </IPaySubHeadlineText>
                </IPayView>
              )}

              {transaction?.transactionRequestType !== 'COUT_WU' &&
                transaction?.transactionRequestType !== 'COUT_EXPRESS' && (
                  <IPayView style={styles.cardStyle}>
                    <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
                      Reference number
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
                  Date and time
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
