import images from '@app/assets/images';
import { TransactionOperations, TransactionTypes } from '@app/enums/transaction-types.enum';
import { BeneficiaryTransactionItemProps } from './beneficiary-transaction-history.interface';

const beneficiaryHistoryData: BeneficiaryTransactionItemProps[] = [
  {
    name: 'Floyd Miles',
    transactionRequestType: TransactionTypes.TRANSFER_SEND_MONEY,
    transactionType: TransactionOperations.CREDIT,
    amount: '600',
    beneficiaryName: 'Miles',
    transfer_by: images.nationalBankLogo,
    transfer_reason: 'Family and frindes',
    note: 'Hello My dear',
    transactionRefNumber: 'FTA35346',
    feesAmount: '10 SAR',
    vatAmount: '40 SAR',
    total_amount: '3000 SAR',
    bankName: 'Saudi National Bank',
    bankImage: images.nationalBankLogo,
    bank_account_no: 'EG380019000500000000263180001',
    transactionDateTime: '2008-04-08T15:05:00',
  },
  {
    name: 'Brooklyn Simmons',
    transactionRequestType: TransactionTypes.TRANSFER_RECEIVED_MONEY,
    transactionType: TransactionOperations.DEBIT,
    amount: '1200',
    sender_nick_name: 'Ahmed Mohamed',
    transfer_by: images.nationalBankLogo,
    transfer_reason: 'Family and frindes',
    note: 'Hello My dear',
    transactionRefNumber: 'FTA35346',
    bankName: 'Saudi National Bank',
    bankImage: images.nationalBankLogo,
    bank_account_no: 'EG380019000500000000263180002',
    transactionDateTime: '2008-06-010T15:08:00',
  },
  {
    name: 'Kristin Watson',
    transactionRequestType: TransactionTypes.TRANSFER_SEND_MONEY,
    transactionType: TransactionOperations.CREDIT,
    amount: '700',
    beneficiaryName: 'Miles',
    transfer_by: images.rajhiBankLogo,
    transfer_reason: 'Family and frindes',
    note: 'Hello My dear',
    transactionRefNumber: 'FTA35346',
    feesAmount: '10 SAR',
    vatAmount: '40 SAR',
    total_amount: '3050 SAR',
    bankName: 'Al Rajhi Bank',
    bankImage: images.rajhiBankLogo,
    bank_account_no: 'EG380019000500000000263180003',
    transactionDateTime: '2008-05-07T20:10:00',
  },
  {
    name: 'Devon Lane',
    transactionRequestType: TransactionTypes.TRANSFER_RECEIVED_MONEY,
    transactionType: TransactionOperations.DEBIT,
    amount: '510',
    sender_nick_name: 'Ahmed Mohamed',
    transfer_by: images.rajhiBankLogo,
    transfer_reason: 'Family and frindes',
    note: 'Hello My dear',
    transactionRefNumber: 'FTA35346',
    bankName: 'Al Rajhi Bank',
    bankImage: images.rajhiBankLogo,
    bank_account_no: 'EG380019000500000000263180004',
    transactionDateTime: '2008-06-010T15:08:00',
  },
  {
    name: 'Jacob Jones',
    transactionRequestType: TransactionTypes.TRANSFER_SEND_MONEY,
    transactionType: TransactionOperations.CREDIT,
    amount: '850',
    beneficiaryName: 'Miles',
    transfer_by: images.alinmaBankLogo,
    transfer_reason: 'Family and frindes',
    note: 'Hello My dear',
    transactionRefNumber: 'FTA35346',
    feesAmount: '10 SAR',
    vatAmount: '40 SAR',
    total_amount: '3100 SAR',
    bankName: 'Alinma Bank',
    bankImage: images.alinmaBankLogo,
    bank_account_no: 'EG380019000500000000263180005',
    transactionDateTime: '2008-06-010T15:08:00',
  },
  {
    name: 'Wade Warren',
    transactionRequestType: TransactionTypes.TRANSFER_RECEIVED_MONEY,
    transactionType: TransactionOperations.DEBIT,
    amount: '2150',
    sender_nick_name: 'Ahmed Mohamed',
    transfer_by: images.alinmaBankLogo,
    transfer_reason: 'Family and frindes',
    note: 'Hello My dear',
    transactionRefNumber: 'FTA35346',
    bankName: 'Alinma Bank',
    bankImage: images.alinmaBankLogo,
    bank_account_no: 'EG380019000500000000263180006',
    transactionDateTime: '2008-06-010T15:08:00',
  },
];

export default beneficiaryHistoryData;
