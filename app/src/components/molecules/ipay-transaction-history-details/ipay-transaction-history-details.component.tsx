import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayTitle3Text,
  IPayView,
} from '@app/components/atoms';
import { LocalizationKeysMapping, TransactionsStatus } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText, dateTimeFormat } from '@app/utilities';
import { checkDateValidation, formatDateAndTime } from '@app/utilities/date-helper.util';
import { States, ToastTypes } from '@app/utilities/enums.util';
import getArryFromObject from '@app/utilities/object-to-array.helper';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import IPayChip from '../ipay-chip/ipay-chip.component';
import { useToastContext } from '../ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '../ipay-toast/ipay-toast.interface';
import { IPayTransactionHistoryDetailsProps, TransactionItemProps } from './ipay-transaction-history-details.interface';
import transactionDetailsStyles from './ipay-transaction-history-details.style';

const IPayTransactionHistoryDetails = forwardRef(
  (
    {
      testID,
      style,
      transactionData,
      senderCurrency,
      receiverCurrency,
      vatPercentage,
    }: IPayTransactionHistoryDetailsProps,
    ref,
  ) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const styles = transactionDetailsStyles(colors);
    const localizationText = useLocalization();
    const { showToast } = useToastContext();
    const [transactionDataArray, setTransactionDataArray] = useState<{ key: string; value: any }[]>([]);
    const transactionTypeCheck = transactionData?.totalDebitAmount;
    const transactionAmount = `${transactionTypeCheck ? '+' : '-'}${transactionData?.amount} ${senderCurrency}`;

    const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
      showToast(
        {
          title,
          subTitle,
          toastType,
          isShowRightIcon: false,
          containerStyle: styles.toastStyle,
          leftIcon: icon || <IPayIcon icon={icons.copy_success} size={18} color={colors.natural.natural0} />,
        },
        displayTime,
      );
    };

    /// Toast to show when click on copy reference icon
    useImperativeHandle(ref, () => ({
      triggerSuccessToast() {
        renderToast({
          icon: <IPayImage image={images.money_tick} style={styles.moneyTimeImg} />,
          title: t('TOP_UP.REF_NUMBER_COPIED'),
          subTitle: `${transactionData?.amount} ${localizationText.COMMON.SAR}`,
          toastType: ToastTypes.SUCCESS,
          displayTime: 2000,
        });
      },
    }));

    // transaction data which is in object form need to be converted into an arry
    const getTransactionDataToRender = () => {
      if (transactionData) {
        const data = getArryFromObject(transactionData);
        setTransactionDataArray(data);
      }
    };

    useEffect(() => {
      getTransactionDataToRender();
    }, [transactionData]);

    // when on press copy icon this method will trigger, it will copy the number and render taost message
    const onPressCopyIcon = (refNo: string) => {
      copyText(refNo);
      renderToast({ title: t('TOP_UP.REF_NUMBER_COPIED'), toastType: ToastTypes.INFORMATION });
    };

    // To get the tile text for list view data of a trnasaction
    const getTransactionTitleText = (key: string) => {
      let text = '';
      switch (key) {
        case 'amount':
          text = senderCurrency || '';
          break;
        case 'vatAmount':
          text = `(${vatPercentage}%)`;
          break;
        case 'vat':
          text = `(${vatPercentage}%)`;
          break;
        case 'payrollAmount':
          text = receiverCurrency || '';
          break;
        default:
          break;
      }
      return `${localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[key] as keyof typeof localizationText.TRANSACTION_HISTORY]} ${text}`;
    };

    // This fucntion is used to get localization for transaction data values
    const getTransactionValueText = (value: string) => {
      const date = checkDateValidation(value, dateTimeFormat.DayMonthYearAndTime);
      if (date.isValid()) {
        return formatDateAndTime(new Date(value), dateTimeFormat.TimeAndDate); // Format the date
      }
      const mappedKey = LocalizationKeysMapping[value] as keyof typeof localizationText.TRANSACTION_HISTORY;
      return localizationText.TRANSACTION_HISTORY[mappedKey] || value;
    };

    const getTransactionStatusValue = (value: string) => {
      const valueText = getTransactionValueText(value);
      switch (value) {
        case TransactionsStatus.REFUND:
          return <IPayChip textValue={valueText} variant={States.WARNING} isShowIcon={false} />;
        case TransactionsStatus.PAID:
          return <IPayChip textValue={valueText} variant={States.SUCCESS} isShowIcon={false} />;
        case TransactionsStatus.PENDING:
          return <IPayChip textValue={valueText} variant={States.SEVERE} isShowIcon={false} />;
        default:
          return <IPayChip textValue={valueText} variant={States.ERROR} isShowIcon={false} />;
      }
    };

    // Function to check the condition dynamically
    const isSpecialIndex = (index?: number) => {
      const specialIndices = [9, 17];
      return (index && specialIndices.includes(index)) || false;
    };

    const renderTransactionDetails = ({ item, index }: TransactionItemProps) => (
      <IPayView style={[styles.transactionCard, isSpecialIndex(index) && styles.transactionCardConditionalStyle]}>
        <IPayFootnoteText text={getTransactionTitleText(item?.key)} color={colors.natural.natural900} />
        {item?.key === 'status' ? (
          getTransactionStatusValue(item?.value)
        ) : (
          <IPayView style={styles.detailsView}>
            <IPaySubHeadlineText
              regular
              text={getTransactionValueText(item?.value)}
              color={colors.primary.primary800}
              numberOfLines={1}
              style={styles.subTitle}
            />
            {item?.key === 'transactionRefNumber' && (
              <IPayPressable style={styles.icon} onPress={() => onPressCopyIcon(item?.value)}>
                <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
              </IPayPressable>
            )}
          </IPayView>
        )}
      </IPayView>
    );

    return (
      <IPayView testID={`${testID}-transaction-detail`} style={[styles.container, style]}>
        <IPayView style={styles.headerView}>
          <IPayFootnoteText text="TRANSACTION_HISTORY.AMOUNT" />
          <IPayTitle3Text
            regular={false}
            text={transactionAmount}
            style={styles.transactionAmount}
            color={transactionTypeCheck ? colors.tertiary.tertiary500 : colors.error.error500}
          />
        </IPayView>
        <IPayView style={styles.childComponent}>
          <IPayFlatlist
            data={transactionDataArray}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderTransactionDetails}
            itemSeparatorStyle={StyleSheet.flatten(styles.itemSeparatorStyle)}
          />
        </IPayView>
      </IPayView>
    );
  },
);

export default IPayTransactionHistoryDetails;
