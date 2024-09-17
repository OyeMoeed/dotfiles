import { MoneyRequestStatus } from '@app/enums/money-request-status.enum';
import { isAndroidOS } from '@app/utilities/constants';
import { TransactionOperations } from '@app/enums/transaction-types.enum';

const baseMapping = {
  status: true,
  note: true,
  ref_number: true,
  payment_date: true,
  cancellation_date: true,
  rejection_date: true,
  request_date: false,
  sender_mobile_number: false,
  receiver_mobile_number: false,
  send_date: false,
};

const getTypeFieldMapping = (status: MoneyRequestStatus, type: TransactionOperations): string[] => {
  const mapping: { [key: string]: boolean } = { ...baseMapping };

  if (type === TransactionOperations.DEBIT) {
    mapping.request_date = true;
    mapping.sender_mobile_number = true;
  } else {
    mapping.send_date = true;
    mapping.receiver_mobile_number = true;
  }

  return Object.keys(mapping).filter((key) => mapping[key]);
};

const heightMapping = {
  [MoneyRequestStatus.PAID]: isAndroidOS ? '98%' : '98%',
  [MoneyRequestStatus.PENDING]: isAndroidOS ? '98%' : '98%',
  [MoneyRequestStatus.REJECTED]: isAndroidOS ? '98%' : '98%',
  [MoneyRequestStatus.CANCEL]: isAndroidOS ? '98%' : '98%',
};

export { heightMapping, getTypeFieldMapping };
