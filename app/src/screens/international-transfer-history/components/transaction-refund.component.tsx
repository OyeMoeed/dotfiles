import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayChip } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { Countires, LocalizationKeysMapping } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { buttonVariants, States, ToastTypes } from '@app/utilities/enums.util';
import getArryFromObject from '@app/utilities/object-to-array.helper';
import React, { useEffect, useState } from 'react';
import transactionDetailsCompStyles from './transaction-details-component.style';
import { TransactionRefundProps } from './transction-details-component.interface';

const TransactionRefund: React.FC<TransactionRefundProps> = ({
  testID,
  style,
  transactionData,
  amount,
  onPressRefund,
  onPressCancel,
}) => {
  const { colors } = useTheme();
  const styles = transactionDetailsCompStyles(colors);
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const [transactionDataArray, setTransactionDataArray] = useState<{ key: string; value: any }[]>([]);

  const transactionAmount = `${localizationText.TRANSACTION_HISTORY.REFUND} ${amount} ${localizationText.COMMON.SAR}`;

  const getTransactionDataToRender = () => {
    if (transactionData) {
      const data = getArryFromObject(transactionData);
      setTransactionDataArray(data);
    }
  };

  useEffect(() => {
    getTransactionDataToRender();
  }, [transactionData]);

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title,
        subTitle,
        toastType,
        isShowRightIcon: false,
        containerStyle: styles.refundToastStyle,
        leftIcon: icon || <IPayIcon icon={icons.copy_success} size={18} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };

  const onPressCopy = (refNo: string) => {
    copyText(refNo);
    renderToast({ title: localizationText.TOP_UP.REF_NUMBER_COPIED, toastType: ToastTypes.INFORMATION });
  };

  const getValueText = (value: string) => {
    if (value === Countires.PAKISTAN || value === Countires.EGYPT) {
      return localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[`${value}`]];
    }
    return value;
  };

  return (
    <IPayView testID={`${testID}-transaction-refund`} style={[styles.refundMainView, style]}>
      <IPayView style={styles.refundHeaderView}>
        <IPayIcon icon={icons.money_time2} size={64} />
        <IPayTitle2Text text={transactionAmount} color={colors.primary.primary900} style={styles.refundText} />
        <IPayCaption1Text
          text={localizationText.TRANSACTION_HISTORY.REFUND_CAUTION_MESSAGE}
          color={colors.primary.primary800}
        />
      </IPayView>

      <IPayView style={styles.redundChildView}>
        <IPayFlatlist
          data={transactionDataArray}
          keyExtractor={(_, index) => index.toString()}
          itemSeparatorStyle={styles.refundItemSeparatorStyle}
          renderItem={({ item }) => (
            <IPayView style={styles.refundTransactionCard}>
              <IPayFootnoteText
                text={`${localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[item?.key] as keyof typeof localizationText.TRANSACTION_HISTORY]}`}
                color={colors.natural.natural900}
              />
              <IPayView style={styles.refundDetailsView}>
                <IPaySubHeadlineText
                  regular
                  text={getValueText(item?.value)}
                  color={colors.primary.primary800}
                  numberOfLines={1}
                  style={styles.refundSubTitle}
                />
                {(item.key === 'transactionRefNumber' || item.key === 'remittanceRefNumber') && (
                  <IPayPressable style={styles.refundIcon} onPress={() => onPressCopy(item?.value)}>
                    <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
                  </IPayPressable>
                )}
              </IPayView>
            </IPayView>
          )}
        />
      </IPayView>

      <IPayView style={styles.refundFooterView}>
        <IPayView style={styles.refundCautionView}>
          <IPayChip
            textValue={localizationText.TRANSACTION_HISTORY.AMOUNT_WILL_REFUND_EXCLUDING_FEE_AND_VAT}
            variant={States.WARNING}
          />
        </IPayView>
        <IPayButton
          onPress={onPressRefund}
          btnType={buttonVariants.PRIMARY}
          large
          btnColor={colors.error.error500}
          btnText={localizationText.TRANSACTION_HISTORY.REFUND}
          textColor={colors.natural.natural0}
          btnIconsDisabled
          btnStyle={styles.refundBtn}
        />
        <IPayButton
          onPress={onPressCancel}
          btnType={buttonVariants.OUTLINED}
          large
          btnText={localizationText.COMMON.CANCEL}
          btnIconsDisabled
        />
      </IPayView>
    </IPayView>
  );
};

export default TransactionRefund;
