import icons from '@app/assets/icons';
import {
  IPayBodyText,
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayInput,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayChip, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { States } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { IPaySadadBillDetailBoxProps, SadadBillItemProps } from './ipay-sadad-bill-details-box.interface';
import sadadBillDetailBoxStyles from './ipay-sadad-bill-details-box.style';

/**
 * Defines the props interface for the IPaySadadBillDetailBoxProps component.
 * @param {string} [props.testID] - Test ID for testing purposes.
 * @param {React.ReactElement} [props.leftIcon] - React element for the left icon.
 * @param {React.ReactElement} [props.rightIcon] - React element for the right icon.
 * @param {string} [props.actionBtnText] - Text for action button.
 * @param {boolean} [props.showActionBtn] - Flag indicating if action button should be shown.
 * @param {() => void} [props.onPress] - Callback function called when the Pressable is pressed.
 * @param {boolean} [props.showAmountToPay] - Flag indicating if amount to pay should be shown.
 * @param {SadadBillItemProps} props.item - Item containing bill details.
 * @param {StyleProp<ViewStyle>} [props.style] - Standard styles for a View.
 */

const IPaySadadBillDetailsBox: React.FC<IPaySadadBillDetailBoxProps> = ({
  actionBtnText,
  leftIcon,
  rightIcon,
  onPress,
  showActionBtn,
  testID,
  showAmountToPay = true,
  item,
  style,
  handleAmountInputFromOutSide = false,
  onChangeAmountOutside,
}) => {
  const { colors } = useTheme();
  const styles = sadadBillDetailBoxStyles(colors);
  const localizationText = useLocalization();
  const {
    overPaidAmount = 0,
    isOverPaid,
    billTitle,
    vendor,
    vendorIcon,
    currency = localizationText.COMMON.SAR,
    billAmount,
    isTransactionDeclined,
    declinedTitle,
    declinedMessage,
  }: SadadBillItemProps = item;
  const [amount, setAmount] = useState<number>(billAmount);
  const [overPayBill, setOverPayBill] = useState<boolean>(false);
  const [overPayingValue, setOverPayingValue] = useState<number>(overPaidAmount);

  const onChangeInput = (value: string) => {
    if (handleAmountInputFromOutSide === true && onChangeAmountOutside) {
      onChangeAmountOutside(value);
    }
    const billValue = Number(value);
    const overPaid = billValue - billAmount;
    setAmount(billValue);

    if (billValue > amount && overPaid > 0) {
      setOverPayBill(true);
      setOverPayingValue(overPaid);
    } else {
      setOverPayBill(false);
      setOverPayingValue(0);
    }
  };

  return (
    <IPayView testID={testID} style={[styles.boxContainer, style]}>
      {isOverPaid && (
        <IPayView style={styles.topInfoWrapper}>
          <IPayCaption2Text color={colors.natural.natural900} text={localizationText.NEW_SADAD_BILLS.OVERPAID_BY} />
          <IPayCaption2Text
            color={colors.natural.natural900}
            regular={false}
            text={`: ${overPaidAmount} ${currency}`}
          />
        </IPayView>
      )}
      {isTransactionDeclined && (
        <IPayList
          leftIcon={<IPayIcon color={colors.error.error500} icon={icons.clipboard_close_error} size={24} />}
          title={declinedTitle}
          subTitle={declinedMessage}
          isShowLeftIcon
          titleLines={1}
          isShowSubTitle
          centerContainerStyles={styles.listCenterContainer}
          textStyle={styles.declinedTitle}
          subTextStyle={styles.declinedSubTitle}
          containerStyle={styles.declinedContainer}
          regularTitle={false}
        />
      )}
      <IPayList
        leftIcon={<IPayImage image={vendorIcon} style={styles.listLeftImg} />}
        title={billTitle}
        subTitle={vendor}
        isShowLeftIcon
        subTitleLines={1}
        titleLines={1}
        isShowSubTitle
        centerContainerStyles={styles.listCenterContainer}
        textStyle={styles.listTitle}
        containerStyle={styles.listContainer}
        regularTitle={false}
        rightText={
          <IPayView style={styles.listRightText}>
            {isOverPaid && (
              <IPayCaption1Text
                style={styles.lineThrough}
                color={colors.natural.natural500}
                text={`${Number(amount) + overPaidAmount} ${currency}`}
              />
            )}
            <IPayCaption1Text color={colors.primary.primary800} regular={false} text={`${billAmount} ${currency}`} />
          </IPayView>
        }
      />
      {showAmountToPay && (
        <IPayView style={styles.amountToBePaidWrapper}>
          <IPayFootnoteText
            color={colors.natural.natural700}
            text={localizationText.NEW_SADAD_BILLS.AMOUNT_TO_BE_PAID}
          />
          <IPayView style={styles.amountWrapper}>
            <IPayInput
              style={styles.amountInput}
              text={amount?.toString()}
              keyboardType="numeric"
              onChangeText={onChangeInput}
              maxLength={10}
            />
            <IPayBodyText style={styles.darkBlueColor} text={currency} />
          </IPayView>
        </IPayView>
      )}
      {overPayBill && (
        <IPayChip
          containerStyle={styles.chipContainer}
          isShowIcon={false}
          variant={States.SEVERE}
          textValue={`${localizationText.NEW_SADAD_BILLS.YOU_OVERPAYING} ${overPayingValue} ${currency}`}
        />
      )}
      {showActionBtn && (
        <IPayPressable onPress={onPress} style={styles.bottomActionWrapper}>
          {leftIcon || <IPayView />}
          <IPaySubHeadlineText regular color={colors.primary.primary500} text={actionBtnText} />
          {rightIcon || <IPayView />}
        </IPayPressable>
      )}
    </IPayView>
  );
};

export default IPaySadadBillDetailsBox;
