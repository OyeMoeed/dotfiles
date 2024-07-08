import icons from '@app/assets/icons';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayTitle3Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayShareableImageView } from '@app/components/molecules';
import {
  copiableKeys,
  localizationKeys,
  transactionOperations,
  transactionTypes,
} from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import { typeFieldMapping } from './ipay-transaction-history.constant';
import { IPayTransactionProps } from './ipay-transaction-history.interface';
import transactionHistoryStyle from './ipay-transaction-history.style';

const IPayTransactionHistory: React.FC<IPayTransactionProps> = ({ testID, transaction, onCloseBottomSheet }) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = transactionHistoryStyle(colors);
  const [isShareable, setIsShareable] = useState<boolean>(false);
  const applyLocalizationKeys: (keyof IPayTransactionItemProps)[] = [localizationKeys.TRANSACTION_TYPE];
  const copiableItems: (keyof IPayTransactionItemProps)[] = [copiableKeys.REF_NUMBER];

  const showSplitButton =
    transaction?.transaction_type === transactionTypes.POS_PURCHASE ||
    transaction?.transaction_type === transactionTypes.E_COMMERCE;

  const onPressPrint = () => {
    setIsShareable(false);
  };

  const onPressShare = () => {
    setIsShareable(true);
    if (onCloseBottomSheet) onCloseBottomSheet();
  };

  const renderItem = (field: keyof IPayTransactionItemProps, index: number) => {
    const value = transaction[field];
    return (
      <IPayView style={styles.cardStyle} key={index}>
        <IPayFootnoteText regular style={styles.headingStyles} color={colors.natural.natural900}>
          {localizationText[field]}
        </IPayFootnoteText>
        <IPayPressable style={styles.actionWrapper} disabled={!copiableItems.includes(field)} onPress={() => {}}>
          <IPaySubHeadlineText regular color={colors.primary.primary800}>
            {applyLocalizationKeys.includes(field) ? localizationText[`${value as string}_type`] : value}
          </IPaySubHeadlineText>
          {copiableItems.includes(field) && <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
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
              <IPayButton
                btnType="outline"
                onPress={onPressShare}
                btnText={localizationText.TOP_UP.REF_NUMBER}
                medium
                btnStyle={[styles.button, showSplitButton && styles.conditionButton]}
                leftIcon={<IPayIcon icon={icons.share} size={18} color={colors.primary.primary500} />}
              />
              {transaction.transaction_type === transactionTypes.LOCAL_TRANSFER && (
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
              <IPayFootnoteText color={colors.natural.natural900}>{localizationText.TRANSACTION_HISTORY.AMOUNT}</IPayFootnoteText>
              <IPayTitle3Text
                style={[
                  styles.footnoteBoldTextStyle,
                  transaction?.type === transactionOperations.DEBIT
                    ? styles.footnoteGreenTextStyle
                    : styles.footnoteRedTextStyle,
                ]}
                regular={false}
              >
                {`${transaction?.type === transactionOperations.DEBIT ? '+' : '-'}${transaction?.amount} SAR`}
              </IPayTitle3Text>
            </IPayView>
            {transaction &&
              Object.keys(transaction)
                .filter((key) => typeFieldMapping[transaction.transaction_type].includes(key))
                .map((field: string, index: number) => renderItem(field as keyof IPayTransactionItemProps, index))}
          </IPayView>
        </IPayShareableImageView>
      </IPayScrollView>
    </IPayView>
  );
};

export default IPayTransactionHistory;
