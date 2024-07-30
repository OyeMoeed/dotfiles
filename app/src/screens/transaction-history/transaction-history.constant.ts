import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';
import { IPayTransactionItemProps } from './component/ipay-transaction.interface';

const historyData: IPayTransactionItemProps[] = [
  {
    beneficiaryName: 'Omar Abdulrahman',
    transactionRequestType: TransactionTypes.CIN_CASH_BACK,
    transactionType: TransactionOperations.DEBIT,
    amount: '300',
    card: 'Mada Debit Card **** 1111',
    transactionRefNumber: 'FTA35346',
    transactionDateTime: new Date('2024-07-05T16:00:00+05:00').toString(),
  },
  {
    beneficiaryName: 'Ahmed Mohamed',
    transactionRequestType: TransactionTypes.ATM,
    transactionType: TransactionOperations.CREDIT,
    amount: '200',
    card: 'Mada Debit Card **** 1111',
    atm_location: 'Al Takhassousi',
    atm_transaction: 'Cart',
    transactionDateTime: new Date('2024-07-07T18:00:00+05:00').toString(),
    transactionRefNumber: 'FTA35346',
  },
  {
    beneficiaryName: 'Omar Abdulrahman',
    transactionRequestType: TransactionTypes.APPLE_PAY_TOP_UP,
    transactionType: TransactionOperations.DEBIT,
    amount: '300',
    transactionRefNumber: 'FTA35346',
    transactionDateTime: new Date('2024-07-10T21:00:00+05:00').toString(),
  },
];

export default historyData;
