import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayTransactionHistoryDetails } from '@app/components/molecules';
import { TransactionsStatus } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import transactionDetailsCompStyles from './transaction-details-component.style';
import { transactionMockData } from './transaction-details-data.mock';
import TransactionDetailsFooterButtons from './transaction-details-footer-buttons.component';
import { TransactionDetailsProps, TransactionMockData } from './transction-details-component.interface';

const TransactionDetails = forwardRef<{}, TransactionDetailsProps>(
  ({ testID, style, transaction, onCloseBottomSheet, onPressRefund, onPressEditBeneficiary }, ref) => {
    const { colors } = useTheme();
    const styles = transactionDetailsCompStyles(colors);
    const localizationText = useLocalization();
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

    const onPressShare = () => {
      if (onCloseBottomSheet) onCloseBottomSheet();
    };
    const onPressSplitBill = () => {
      if (onCloseBottomSheet) onCloseBottomSheet();
    };

    return (
      <IPayView
        testID={`${testID}-transaction-details-component`}
        style={[styles.container, transactionStatus && styles.containerContiditional, style]}
      >
        <IPayView style={styles.listView}>
          <IPayTransactionHistoryDetails ref={transactionHistoryDetailsRef} transactionData={getTransactionData()} />
        </IPayView>
        {transactionStatus && (
          <IPayView style={styles.footerView}>
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
              btnText={localizationText.TRANSACTION_HISTORY.VAT_INVOICE}
              btnStyle={styles.vatBtn}
            />
          </IPayView>
        )}
      </IPayView>
    );
  },
);

export default TransactionDetails;
