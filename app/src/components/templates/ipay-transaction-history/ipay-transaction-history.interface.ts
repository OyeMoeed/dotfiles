import { IPayTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';

interface IPayTransactionProps {
  testID?: string;
  transaction: IPayTransactionItemProps | any;
  onCloseBottomSheet?: () => void;
}
interface MappingType {
  [key: string]: string[];
}

export { IPayTransactionProps, MappingType };
