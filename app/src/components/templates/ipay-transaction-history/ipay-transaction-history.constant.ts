import { TransactionTypes } from '@app/enums/transaction-types.enum';
import { isAndroidOS } from '@app/utilities/constants';
import { MappingType } from './ipay-transaction-history.interface';

const typeFieldMapping: MappingType = {
  [TransactionTypes.SEND_MONEY]: [
    'transactionRequestType',
    'transactionDateTime',
    'senderName',
    'receiver',
    'transfer_reason',
    'note',
    'transactionRefNumber',
  ],
  [TransactionTypes.RECEIVED_MONEY]: [
    'transactionRequestType',
    'transactionDateTime',
    'senderName',
    'transfer_reason',
    'note',
    'transactionRefNumber',
  ],
  [TransactionTypes.PAY_BILL]: [
    'transactionRequestType',
    'transactionDateTime',
    'cardType',
    'merchant_name',
    'feesAmount',
    'vatAmount',
    'transactionRefNumber',
  ],
  [TransactionTypes.COUT_EXPRESS]: [
    'transactionRequestType',
    'transactionDateTime',
    'cardType',
    'merchant_name',
    'feesAmount',
    'vatAmount',
    'acquire_country',
    'transactionRefNumber',
  ],
  [TransactionTypes.CIN_CASH_BACK]: [
    'transactionRequestType',
    'transactionDateTime',
    'cardType',
    'transactionRefNumber',
  ],
  [TransactionTypes.VISA_SIGNATURE_CARD_INSURANCE]: [
    'transactionRequestType',
    'transactionDateTime',
    'transactionRefNumber',
  ],
  [TransactionTypes.ATM]: [
    'transactionRequestType',
    'transactionDateTime',
    'cardType',
    'atm_location',
    'atm_transaction',
    'transactionRefNumber',
  ],
  [TransactionTypes.BKF_TRANSFER]: [
    'transactionRequestType',
    'transactionDateTime',
    'senderName',
    'receiver',
    'bankName',
    'iban',
    'senders_iban',
    'note',
    'feesAmount',
    'vatAmount',
    'transactionRefNumber',
  ],
  [TransactionTypes.APPLE_PAY_TOP_UP]: ['transactionRequestType', 'transactionDateTime', 'transactionRefNumber'],
  [TransactionTypes.TRANSFER_SEND_MONEY]: [
    'beneficiaryName',
    'transfer_by',
    'transfer_reason',
    'note',
    'transactionRefNumber',
    'feesAmount',
    'vatAmount',
    'total_amount',
  ],
  [TransactionTypes.TRANSFER_RECEIVED_MONEY]: [
    'sender_nick_name',
    'transfer_by',
    'transfer_reason',
    'note',
    'transactionRefNumber',
  ],
};

const heightMapping = {
  [TransactionTypes.SEND_MONEY]: isAndroidOS ? '90%' : '92%',
  [TransactionTypes.RECEIVED_MONEY]: isAndroidOS ? '77%' : '84%',
  [TransactionTypes.PAY_BILL]: isAndroidOS ? '85%' : '92%',
  [TransactionTypes.COUT_EXPRESS]: isAndroidOS ? '95%' : '100%',
  [TransactionTypes.CIN_CASH_BACK]: isAndroidOS ? '61%' : '70%',
  [TransactionTypes.VISA_SIGNATURE_CARD_INSURANCE]: isAndroidOS ? '53%' : '62%',
  [TransactionTypes.ATM]: isAndroidOS ? '77%' : '84%',
  [TransactionTypes.BKF_TRANSFER]: isAndroidOS ? '95%' : '100%',
  [TransactionTypes.APPLE_PAY_TOP_UP]: isAndroidOS ? '53%' : '62%',
  [TransactionTypes.TRANSFER_SEND_MONEY]: isAndroidOS ? '90%' : '96%',
  [TransactionTypes.TRANSFER_RECEIVED_MONEY]: isAndroidOS ? '70%' : '77%',
};

export { heightMapping, typeFieldMapping };
