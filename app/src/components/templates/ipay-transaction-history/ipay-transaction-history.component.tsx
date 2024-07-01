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
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { typeFieldMapping } from './ipay-transaction-history.constant';
import { IPayTransactionProps } from './ipay-transaction-history.interface';
import transactionHistoryStyle from './ipay-transaction-history.style';

const IPayTransactionHistory: React.FC<IPayTransactionProps> = ({ testID, transaction, onCloseBottomSheet }) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = transactionHistoryStyle(colors);
  const applyLocalizationKeys: (keyof IPayTransactionItemProps)[] = [localizationKeys.TRANSACTION_TYPE];
  const copiableItems: (keyof IPayTransactionItemProps)[] = [copiableKeys.REF_NUMBER];

  const showSplitButton =
    transaction?.transaction_type === transactionTypes.POS_PURCHASE ||
    transaction?.transaction_type === transactionTypes.E_COMMERCE;

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
          otherView={
            <IPayView style={[styles.buttonWrapper, showSplitButton && styles.conditionButtonWrapper]}>
              {showSplitButton && (
                <IPayButton
                  btnType="primary"
                  btnText={localizationText.split_bill}
                  small
                  btnStyle={[styles.button, showSplitButton && styles.conditionButton]}
                  leftIcon={<IPayIcon icon={icons.bill1} size={moderateScale(18)} color={colors.natural.natural0} />}
                  onPress={() => {}}
                />
              )}
              <IPayButton
                btnType="outline"
                onPress={onCloseBottomSheet}
                btnText={localizationText.share}
                small
                shareable
                btnStyle={[styles.button, showSplitButton && styles.conditionButton]}
                leftIcon={<IPayIcon icon={icons.share} size={moderateScale(18)} color={colors.primary.primary500} />}
              />
              {transaction.transaction_type === transactionTypes.LOCAL_TRANSFER && (
                <IPayButton
                  btnType="primary"
                  btnText={localizationText.vat_invoice}
                  small
                  btnStyle={styles.button}
                  rightIcon={
                    <IPayIcon icon={icons.export_2} size={moderateScale(18)} color={colors.natural.natural0} />
                  }
                  onPress={() => {}}
                />
              )}
            </IPayView>
          }
        >
          <IPayView>
            <IPayView style={styles.amountSection}>
              <IPayFootnoteText color={colors.natural.natural900}>{localizationText.amount}</IPayFootnoteText>
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
