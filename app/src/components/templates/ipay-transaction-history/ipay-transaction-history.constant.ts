import { TransactionTypes } from '@app/enums/transaction-types.enum';
import { isAndroidOS } from '@app/utilities/constants';
import { MappingType } from './ipay-transaction-history.interface';

const typeFieldMapping: MappingType = {
  [TransactionTypes.SEND_MONEY]: [
    'transaction_type',
    'transaction_date',
    'sender',
    'receiver',
    'transfer_reason',
    'note',
    'ref_number',
  ],
  [TransactionTypes.RECEIVED_MONEY]: [
    'transaction_type',
    'transaction_date',
    'sender',
    'transfer_reason',
    'note',
    'ref_number',
  ],
  [TransactionTypes.POS_PURCHASE]: [
    'transaction_type',
    'transaction_date',
    'card',
    'merchant_name',
    'fee',
    'vat',
    'ref_number',
  ],
  [TransactionTypes.E_COMMERCE]: [
    'transaction_type',
    'transaction_date',
    'card',
    'merchant_name',
    'fee',
    'vat',
    'acquire_country',
    'ref_number',
  ],
  [TransactionTypes.CASHBACK]: ['transaction_type', 'transaction_date', 'card', 'ref_number'],
  [TransactionTypes.VISA_SIGNATURE_CARD_INSURANCE]: ['transaction_type', 'transaction_date', 'ref_number'],
  [TransactionTypes.ATM]: [
    'transaction_type',
    'transaction_date',
    'card',
    'atm_location',
    'atm_transaction',
    'ref_number',
  ],
  [TransactionTypes.LOCAL_TRANSFER]: [
    'transaction_type',
    'transaction_date',
    'sender',
    'receiver',
    'bank_name',
    'receivers_iban',
    'senders_iban',
    'note',
    'fee',
    'vat',
    'ref_number',
  ],
  [TransactionTypes.APPLE_PAY_TOP_UP]: ['transaction_type', 'transaction_date', 'ref_number'],
  [TransactionTypes.TRANSFER_SEND_MONEY]: [
    'beneficiary_nick_name',
    'transfer_by',
    'transfer_reason',
    'note',
    'ref_number',
    'fee',
    'vat',
    'total_amount',
  ],
  [TransactionTypes.TRANSFER_RECEIVED_MONEY]: [
    'sender_nick_name',
    'transfer_by',
    'transfer_reason',
    'note',
    'ref_number',
  ],
};

const heightMapping = {
  [TransactionTypes.SEND_MONEY]: isAndroidOS ? '90%' : '92%',
  [TransactionTypes.RECEIVED_MONEY]: isAndroidOS ? '77%' : '84%',
  [TransactionTypes.POS_PURCHASE]: isAndroidOS ? '85%' : '92%',
  [TransactionTypes.E_COMMERCE]: isAndroidOS ? '95%' : '100%',
  [TransactionTypes.CASHBACK]: isAndroidOS ? '61%' : '70%',
  [TransactionTypes.VISA_SIGNATURE_CARD_INSURANCE]: isAndroidOS ? '53%' : '62%',
  [TransactionTypes.ATM]: isAndroidOS ? '77%' : '84%',
  [TransactionTypes.LOCAL_TRANSFER]: isAndroidOS ? '95%' : '100%',
  [TransactionTypes.APPLE_PAY_TOP_UP]: isAndroidOS ? '53%' : '62%',
  [TransactionTypes.TRANSFER_SEND_MONEY]: isAndroidOS ? '90%' : '92%',
  [TransactionTypes.TRANSFER_RECEIVED_MONEY]: isAndroidOS ? '70%' : '77%',
};

export { heightMapping, typeFieldMapping };
