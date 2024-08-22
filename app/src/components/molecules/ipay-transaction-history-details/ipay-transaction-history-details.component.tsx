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
import {
  Countires,
  LocalizationKeysMapping,
  TransactionMedium,
  TransactionsStatus,
  TransactionTypes,
} from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import { States, toastTypes } from '@app/utilities/enums.util';
import getArryFromObject from '@app/utilities/object-to-array.helper';
import moment from 'moment';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import IPayChip from '../ipay-chip/ipay-chip.component';
import { useToastContext } from '../ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '../ipay-toast/ipay-toast.interface';
import { IPayTransactionHistoryDetailsProps, ItemProps } from './ipay-transaction-history-details.interface';
import transactionDetailsStyles from './ipay-transaction-history-details.style';

const IPayTransactionHistoryDetails = forwardRef(
  ({ testID, style, transactionData }: IPayTransactionHistoryDetailsProps, ref) => {
    const { colors } = useTheme();
    const styles = transactionDetailsStyles(colors);
    const localizationText = useLocalization();
    const { showToast } = useToastContext();
    const [transactionDataArray, setTransactionDataArray] = useState<{ key: string; value: any }[]>([]);
    const transactionTypeCheck = transactionData?.totalDebitAmount;
    const transactionAmount = `${
      transactionTypeCheck ? '+' : '-'
    }${transactionData?.amount} ${localizationText.COMMON.SAR}`;

    const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
      showToast(
        {
          title: title || localizationText.passcode_error,
          subTitle,
          toastType,
          isShowRightIcon: false,
          containerStyle: styles.toastStyle,
          leftIcon: icon || <IPayIcon icon={icons.copy_success} size={18} color={colors.natural.natural0} />,
        },
        displayTime,
      );
    };

    useImperativeHandle(ref, () => ({
      triggerSuccessToast() {
        renderToast({
          icon: <IPayImage image={images.money_tick} style={styles.moneyTimeImg} />,
          title: localizationText.TOP_UP.REF_NUMBER_COPIED,
          subTitle: `${transactionData?.amount} ${localizationText.COMMON.SAR}`,
          toastType: toastTypes.SUCCESS,
          displayTime: 2000,
        });
      },
    }));

    const getDataToRender = () => {
      if (transactionData) {
        const data = getArryFromObject(transactionData);
        setTransactionDataArray(data);
      }
    };

    useEffect(() => {
      getDataToRender();
    }, [transactionData]);

    const onPressCopy = (refNo: string) => {
      copyText(refNo);
      renderToast({ title: localizationText.TOP_UP.REF_NUMBER_COPIED, toastType: toastTypes.INFORMATION });
    };

    const getKeyText = (key: string) => {
      let text = '';
      switch (key) {
        case 'amount':
          text = localizationText.COMMON.SAR;
          break;
        case 'vatAmount':
          text = '(15%)';
          break;
        case 'vat':
          text = '(15%)';
          break;
        case 'payrollAmount':
          text = localizationText.COMMON.PKR;
          break;
        default:
          break;
      }
      return `${localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[`${key}`]]} ${text}`;
    };

    const getValueText = (value: string) => {
      const date = moment(value, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ', true);
      if (date.isValid()) {
        // Format the date
        return formatDateAndTime(new Date(value), dateTimeFormat.TimeAndDate);
      }

      if (
        value === TransactionsStatus.REFUND ||
        value === TransactionsStatus.PAID ||
        value === TransactionsStatus.PENDING ||
        value === TransactionsStatus.REJECTED ||
        value === TransactionTypes.CASH_PICKUP ||
        value === TransactionTypes.BANK_TRANSFER ||
        value === TransactionMedium.ALINMAPAY_DIRECT ||
        value === TransactionMedium.WESTERN_UNION ||
        value === Countires.PAKISTAN ||
        value === Countires.EGYPT
      ) {
        return localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[`${value}`]];
      }
      return value;
    };

    const getStatusValue = (value: string) => {
      const valueText = getValueText(value);
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

    const renderTransactionDetails = ({ item, index }: ItemProps) => (
      <IPayView style={[styles.transactionCard, isSpecialIndex(index) && styles.transactionCardConditionalStyle]}>
        <IPayFootnoteText text={getKeyText(item?.key)} color={colors.natural.natural900} />
        {item?.key === 'status' ? (
          getStatusValue(item.value)
        ) : (
          <IPayView style={styles.detailsView}>
            <IPaySubHeadlineText
              regular
              text={getValueText(item?.value)}
              color={colors.primary.primary800}
              numberOfLines={1}
              style={styles.subTitle}
            />
            {item.key === 'ref_number' && (
              <IPayPressable style={styles.icon} onPress={() => onPressCopy(item?.value)}>
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
          <IPayFootnoteText text={localizationText.TRANSACTION_HISTORY.AMOUNT} />
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
