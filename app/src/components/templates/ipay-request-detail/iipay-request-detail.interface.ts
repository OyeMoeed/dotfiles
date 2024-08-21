import { MoneyRequestStatus } from '@app/enums/money-request-status.enum';
import { TransactionOperations } from '@app/enums/transaction-types.enum';

interface IPayRequestDetailProps {
  testID?: string;
  transaction: IPayRequestMoneyProps | any;
  onCloseBottomSheet?: () => void;
  showActionSheet?: () => void;
}
interface MappingType {
  [key: string]: string[];
}

interface IPayRequestMoneyProps {
  id: string;
  title: string;
  amount: string;
  dates?: string;
  status: MoneyRequestStatus.REJECTED | MoneyRequestStatus.CANCEL | MoneyRequestStatus.PAID | MoneyRequestStatus.PAID;
  type?: TransactionOperations.CREDIT | TransactionOperations.DEBIT;
  note: string;
  send_date?: string;
  request_date?: string;
  rejection_date?: string;
  ref_number?: string;
}

export { IPayRequestDetailProps, IPayRequestMoneyProps, MappingType };
