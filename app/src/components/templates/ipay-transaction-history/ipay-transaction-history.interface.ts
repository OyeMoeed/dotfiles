import { IPayTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';

interface MultiTransactionsProps {
  transaction: IPayTransactionItemProps | any;
  isDebit: boolean;
  isCountGift: boolean;
  isCountWu: boolean;
}
interface IPayTransactionProps {
  testID?: string;
  transaction: IPayTransactionItemProps | any;
  onCloseBottomSheet?: () => void;
  /**
   * to conditionally render on the basis of beneficiary history
   */
  isBeneficiaryHistory?: boolean;
}
interface MappingType {
  [key: string]: string[];
}

export { IPayTransactionProps, MappingType, MultiTransactionsProps };
