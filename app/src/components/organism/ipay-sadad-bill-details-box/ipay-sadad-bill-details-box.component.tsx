import icons from '@app/assets/icons';
import {
  IPayBodyText,
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayTitle3Text,
  IPayView,
} from '@app/components/atoms';
import { IPayChip, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { States } from '@app/utilities/enums.util';
import React from 'react';
import { IPaySadadBillDetailBoxProps } from './ipay-sadad-bill-details-box.interface';
import sadadBillDetailBoxStyles from './ipay-sadad-bill-details-box.style';

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
}) => {
  const { colors } = useTheme();
  const styles = sadadBillDetailBoxStyles(colors);
  const localizationText = useLocalization();

  const {
    overPaidAmount,
    isOverPaid,
    title,
    companyDetails,
    companyImage,
    currency,
    amountToPay,
    isTransactionDeclined,
    declinedTitle,
    declinedMessage,
  } = item;

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
        />
      )}
      <IPayList
        leftIcon={<IPayImage image={companyImage} style={styles.listLeftImg} />}
        title={title}
        subTitle={companyDetails}
        isShowLeftIcon
        subTitleLines={1}
        titleLines={1}
        isShowSubTitle
        centerContainerStyles={styles.listCenterContainer}
        textStyle={styles.listTitle}
        containerStyle={styles.listContainer}
        rightText={
          <IPayView style={styles.listRightText}>
            {isOverPaid && (
              <IPayCaption1Text
                style={styles.lineThrough}
                color={colors.natural.natural500}
                text={`${overPaidAmount} ${currency}`}
              />
            )}
            <IPayCaption1Text color={colors.primary.primary800} regular={false} text={`${amountToPay} ${currency}`} />
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
            <IPayTitle3Text style={styles.darkBlueColor} regular={false} text={amountToPay} />
            <IPayBodyText style={styles.darkBlueColor} text={currency} />
          </IPayView>
        </IPayView>
      )}
      {isOverPaid && (
        <IPayChip
          containerStyle={styles.chipContainer}
          isShowIcon={false}
          variant={States.SEVERE}
          textValue={`${localizationText.NEW_SADAD_BILLS.YOU_OVERPAYING} ${overPaidAmount} ${currency}`}
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
