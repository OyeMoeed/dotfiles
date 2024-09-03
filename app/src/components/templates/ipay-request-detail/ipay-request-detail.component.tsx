import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayTitle3Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import {
  CopiableKeys,
  LocalizationKeys,
  LocalizationKeysMapping,
  MoneyRequestStatus,
} from '@app/enums/money-request-status.enum';
import { TransactionOperations } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { IPayTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { IPayRequestDetailProps, IPayRequestMoneyProps } from './iipay-request-detail.interface';
import { typeFieldMapping } from './ipay-request-detail.constant';
import transactionHistoryStyle from './ipay-request-detail.style';
import SummaryType from '@app/enums/summary-type';

const IPayRequestDetails: React.FC<IPayRequestDetailProps> = ({
  testID,
  transaction,
  onCloseBottomSheet,
  showActionSheet,
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = transactionHistoryStyle(colors);
  const applyStatusKeys: (keyof IPayRequestMoneyProps)[] = [LocalizationKeys.STATUS];
  const copiableItems: (keyof IPayTransactionItemProps)[] = [CopiableKeys.REF_NUMBER];
  const { showToast } = useToastContext();

  const renderToast = (value: string) => {
    showToast({
      title: localizationText.TOP_UP.COPIED,
      subTitle: value,
      containerStyle: styles.containerToastStyle,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      toastType: 'success',
    });
  };

  const getStatusStyles = () => {
    switch (transaction?.status) {
      case MoneyRequestStatus.CANCEL:
        return {
          color: colors.natural.natural700,
          text: localizationText.REQUEST_MONEY.CANCEL,
          backgroundColor: colors.natural.natural100,
        };
      case MoneyRequestStatus.PAID:
        return {
          color: colors.tertiary.tertiary500,
          text: localizationText.REQUEST_MONEY.PAID,
          backgroundColor: colors.success.success25,
        };
      case MoneyRequestStatus.PENDING:
        return {
          color: colors.critical.critical800,
          text: localizationText.REQUEST_MONEY.PENDING,
          backgroundColor: colors.critical.critical25,
        };
      default:
        return {
          color: colors.error.error500,
          text: localizationText.REQUEST_MONEY.REJECTED,
          backgroundColor: colors.error.error25,
        };
    }
  };

  const { color, text, backgroundColor } = getStatusStyles();

  const copyRefNo = (value: string) => {
    copyText(value);
    renderToast(value);
  };

  const onPressCancel = () => {
    if (onCloseBottomSheet) onCloseBottomSheet();
  };

  const onPressPay = () => {
    if (onCloseBottomSheet) onCloseBottomSheet();
    navigate(ScreenNames.REQUEST_SUMMARY, {
      heading: localizationText.REQUEST_MONEY.MONEY_REQUESTS,
      screen: SummaryType.MONEY_REQUEST_SUMMARY,
    });
  };

  const renderItem = (field: keyof IPayRequestMoneyProps, index: number) => {
    let value = transaction[field];
    if (field.includes('date')) {
      const dateType = transaction?.cancellation_date || transaction?.send_date || transaction?.request_date;
      transaction?.payment_date || transaction?.rejection_date;
      value = formatDateAndTime(dateType, dateTimeFormat.DateAndTime);
    }

    return (
      <IPayView style={styles.cardStyle} key={index}>
        <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
          {localizationText.REQUEST_MONEY[LocalizationKeysMapping[field]]}
        </IPayFootnoteText>
        <IPayPressable
          style={styles.actionWrapper}
          disabled={!copiableItems.includes(field)}
          onPress={() => copyRefNo(value)}
        >
          {applyStatusKeys.includes(field) ? (
            <IPayView style={[styles.statusView, { backgroundColor }]}>
              <IPaySubHeadlineText regular text={text} color={color} style={styles.text} />
            </IPayView>
          ) : (
            <IPaySubHeadlineText regular color={colors.primary.primary800} numberOfLines={1}>
              {value}
            </IPaySubHeadlineText>
          )}
          {copiableItems.includes(field) && <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
        </IPayPressable>
      </IPayView>
    );
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayScrollView>
        <>
          <IPayView>
            <IPayView style={styles.amountSection}>
              <IPayCaption1Text color={colors.primary.primary800}>
                {transaction?.type === TransactionOperations.DEBIT
                  ? localizationText.REQUEST_MONEY.RECEIVED_REQUEST_FROM
                  : localizationText.REQUEST_MONEY.SEND_REQUEST_TO}
              </IPayCaption1Text>
              <IPayTitle3Text style={styles.footnoteBoldTitleTextStyle} regular={false}>
                {transaction.title}
              </IPayTitle3Text>
              <IPayTitle3Text style={styles.footnoteBoldTextStyle} regular={false}>
                {`${transaction?.amount} SAR`}
              </IPayTitle3Text>
            </IPayView>
            {transaction &&
              Object.keys(transaction)
                .filter((key) => typeFieldMapping[transaction.status].includes(key))
                .map((field: string, index: number) => renderItem(field as keyof IPayTransactionItemProps, index))}
          </IPayView>
          <IPayView style={styles.buttonWrapper}>
            {transaction?.type === TransactionOperations.CREDIT &&
              transaction.status === MoneyRequestStatus.PENDING && (
                <IPayButton
                  btnType="outline"
                  onPress={onPressCancel}
                  btnText={localizationText.REQUEST_MONEY.CANCEL_REQUEST}
                  medium
                  btnStyle={[styles.button]}
                  leftIcon={<IPayIcon icon={icons.remove} size={18} color={colors.primary.primary500} />}
                />
              )}
            {transaction?.type === TransactionOperations.DEBIT && transaction.status === MoneyRequestStatus.PENDING && (
              <>
                <IPayButton
                  btnType={buttonVariants.PRIMARY}
                  onPress={onPressPay}
                  btnText={localizationText.REQUEST_MONEY.PAY}
                  large
                  btnIconsDisabled
                  btnStyle={styles.button}
                />
                <IPayButton
                  btnType="outline"
                  onPress={showActionSheet}
                  btnText={localizationText.REQUEST_MONEY.REJECT}
                  large
                  btnIconsDisabled
                  btnStyle={styles.rejectButton}
                  textColor={colors.error.error500}
                />
              </>
            )}
          </IPayView>
        </>
      </IPayScrollView>
    </IPayView>
  );
};

export default IPayRequestDetails;
