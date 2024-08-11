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
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import React, { useState } from 'react';
import { typeFieldMapping } from './ipay-transaction-history.constant';
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

  const renderToast = (value: string) => {
    showToast({
      title: localizationText.TOP_UP.COPIED,
      subTitle: value,
      containerStyle: styles.containerToastStyle,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      toastType: 'success',
    });
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

  const renderItem = (field: keyof IPayTransactionItemProps, index: number) => {
    let value = transaction[field];
    if (field === KeysToProcess.TRANSACTION_DATE) {
      value = formatDateAndTime(transaction.transactionDateTime, dateTimeFormat.TimeAndDate);
    }

    return (
      <IPayView style={styles.cardStyle} key={index}>
        <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
          {`${
            localizationText.TRANSACTION_HISTORY[
              LocalizationKeysMapping[field as keyof BeneficiaryTransactionItemProps]
            ]
          } ${field === KeysToProcess.VAT ? `(${calculatedVatPercentage})` : ''}`}
        </IPayFootnoteText>
        <IPayPressable
          style={styles.actionWrapper}
          disabled={!copiableItems.includes(field)}
          onPress={() => copyRefNo(value)}
        >
          {transferByKey.includes(field as keyof BeneficiaryTransactionItemProps) ? (
            <IPayImage
              resizeMode="contain"
              style={styles.beneficiaryLeftImage}
              image={value || images.nationalBankLogo}
            />
          ) : (
            <IPaySubHeadlineText regular color={colors.primary.primary800}>
              {applyLocalizationKeys.includes(field)
                ? localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[`${value}_type`]]
                : value}
            </IPaySubHeadlineText>
          )}
          {copiableItems.includes(field) ? (
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
                  transaction?.transactionType === TransactionOperations.DEBIT
                    ? styles.footnoteGreenTextStyle
                    : styles.footnoteRedTextStyle,
                ]}
                regular={false}
              >
                {`${
                  transaction?.type === TransactionOperations.DEBIT ||
                  transaction?.transactionType === TransactionOperations.DEBIT
                    ? '+'
                    : '-'
                }${transaction?.amount} SAR`}
                {`${transaction?.transactionType === TransactionOperations.DEBIT ? '+' : '-'}${transaction?.amount} SAR`}
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
              {transaction &&
                Object.keys(transaction)
                  .filter((key) => typeFieldMapping[transaction.transactionRequestType].includes(key))
                  .map((field: string, index: number) => renderItem(field as keyof IPayTransactionItemProps, index))}
            </IPayView>
          </IPayView>
        </IPayShareableImageView>
      </IPayScrollView>
    </IPayView>
  );
};

export default IPayTransactionHistory;
