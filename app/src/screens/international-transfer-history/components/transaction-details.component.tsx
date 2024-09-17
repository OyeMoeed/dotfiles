import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayChip, IPayTransactionHistoryDetails } from '@app/components/molecules';
import { TransactionsStatus } from '@app/enums/transaction-types.enum';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, States } from '@app/utilities/enums.util';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import transactionDetailsCompStyles from './transaction-details-component.style';
import { transactionMockData } from './transaction-details-data.mock';
import TransactionDetailsFooterButtons from './transaction-details-footer-buttons.component';
import { TransactionDetailsProps, TransactionMockData } from './transction-details-component.interface';

const TransactionDetails = forwardRef<{}, TransactionDetailsProps>(
  (
    {
      testID,
      style,
      transaction,
      onCloseBottomSheet,
      onPressRefund,
      onPressEditBeneficiary,
      beneficiaryName,
      editBeneficiaryMessage,
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const styles = transactionDetailsCompStyles(colors);
    const { t } = useTranslation();
    const transactionHistoryDetailsRef = useRef<any>(null);
    const transactionStatus = transaction?.status !== TransactionsStatus.REJECTED;
    const trigerTransactionHistoryToast = () => {
      transactionHistoryDetailsRef.current?.triggerSuccessToast();
    };

    useImperativeHandle(ref, () => ({
      trigerTransactionHistoryToast,
    }));

    const getTransactionData = (): TransactionMockData => {
      const filteredTransaction: TransactionMockData = {};

      (Object.keys(transactionMockData) as (keyof TransactionMockData)[]).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(transaction, key)) {
          if (transaction) {
            // Use type assertion to assure TypeScript of the type safety
            filteredTransaction[key] = transaction[key] as TransactionMockData[keyof TransactionMockData];
          }
        }
      });

      return filteredTransaction;
    };

    const getVatPercentage = useMemo(() => {
      const { vatAmount, amount } = transactionMockData || {};
      if (vatAmount && amount) {
        return ((Number(vatAmount) * 100) / Number(amount)).toFixed(2);
      }
      return '0.00';
    }, [transactionMockData]);

    const onPressShare = () => {
      if (onCloseBottomSheet) onCloseBottomSheet();
    };
    const onPressSplitBill = () => {
      if (onCloseBottomSheet) onCloseBottomSheet();
    };

    const getEditMessage = useCallback(() => {
      const messageCheck = editBeneficiaryMessage === t('INTERNATIONAL_TRANSFER.EDIT_BENEFICIARY_PENDING_MESSAGE');
      const chipIcon = messageCheck ? icons.clock_1 : icons.tick_square;
      const iconColor = messageCheck ? colors.critical.critical800 : colors.success.success500;
      const chipVariant = messageCheck ? States.WARNING : States.SUCCESS;

      return (
        <IPayChip
          icon={<IPayIcon icon={chipIcon} size={16} color={iconColor} />}
          variant={chipVariant}
          textValue={editBeneficiaryMessage}
        />
      );
    }, [editBeneficiaryMessage]);

    return (
      <IPayView
        testID={`${testID}-transaction-details-component`}
        style={[styles.container, transactionStatus && styles.containerContiditional, style]}
      >
        <IPayView style={styles.listView}>
          <IPayTransactionHistoryDetails
            ref={transactionHistoryDetailsRef}
            transactionData={getTransactionData()}
            senderCurrency="COMMON.SAR"
            receiverCurrency="COMMON.PKR"
            vatPercentage={getVatPercentage}
          />
        </IPayView>
        {transactionStatus && (
          <IPayView>
            {editBeneficiaryMessage && (
              <IPayView>
                {getEditMessage()}
                {beneficiaryName && (
                  <IPayView style={styles.beneficaryNameView}>
                    <IPayFootnoteText
                      text="INTERNATIONAL_TRANSFER.NEW_BENEFICIARY_NAME"
                      color={colors.natural.natural900}
                    />
                    <IPayFootnoteText text={beneficiaryName} color={colors.natural.natural500} />
                  </IPayView>
                )}
              </IPayView>
            )}
            <TransactionDetailsFooterButtons
              transactionStatus={transaction?.status}
              onPressEditBeneficiary={onPressEditBeneficiary}
              onPressRefund={onPressRefund}
              onPressShare={onPressShare}
              onPressSplitBill={onPressSplitBill}
            />
            <IPayButton
              btnType={buttonVariants.PRIMARY}
              large
              rightIcon={<IPayIcon icon={icons.export_2} size={18} color={colors.primary.primary500} />}
              btnText="TRANSACTION_HISTORY.VAT_INVOICE"
              btnStyle={styles.vatBtn}
            />
          </IPayView>
        )}
      </IPayView>
    );
  },
);

export default TransactionDetails;
