import { IPayTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';

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

export { IPayTransactionProps, MappingType };
