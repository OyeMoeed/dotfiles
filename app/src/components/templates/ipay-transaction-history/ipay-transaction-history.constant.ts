import { transactionTypes } from '@app/enums/transaction-types.enum';
import { isAndroidOS } from '@app/utilities/constants';
import { MappingType } from './ipay-transaction-history.interface';

const typeFieldMapping: MappingType = {
  [transactionTypes.SEND_MONEY]: [
    'transaction_type',
    'transaction_date',
    'sender',
    'receiver',
    'transfer_reason',
    'note',
    'ref_number',
  ],
  [transactionTypes.RECEIVED_MONEY]: [
    'transaction_type',
    'transaction_date',
    'sender',
    'transfer_reason',
    'note',
    'ref_number',
  ],
  [transactionTypes.POS_PURCHASE]: [
    'transaction_type',
    'transaction_date',
    'card',
    'merchant_name',
    'fee',
    'vat',
    'ref_number',
  ],
  [transactionTypes.E_COMMERCE]: [
    'transaction_type',
    'transaction_date',
    'card',
    'merchant_name',
    'fee',
    'vat',
    'acquire_country',
    'ref_number',
  ],
  [transactionTypes.CASHBACK]: ['transaction_type', 'transaction_date', 'card', 'ref_number'],
  [transactionTypes.VISA_SIGNATURE_CARD_INSURANCE]: ['transaction_type', 'transaction_date', 'ref_number'],
  [transactionTypes.ATM]: ['transaction_type', 'transaction_date', 'card', 'atm_location', 'atm_type', 'ref_number'],
  [transactionTypes.LOCAL_TRANSFER]: [
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
  [transactionTypes.APPLE_PAY_TOP_UP]: ['transaction_type', 'transaction_date', 'ref_number'],
};

const heightMapping = {
  [transactionTypes.SEND_MONEY]: isAndroidOS ? '90%' : '92%',
  [transactionTypes.RECEIVED_MONEY]: isAndroidOS ? '77%' : '84%',
  [transactionTypes.POS_PURCHASE]: isAndroidOS ? '85%' : '92%',
  [transactionTypes.E_COMMERCE]: isAndroidOS ? '95%' : '100%',
  [transactionTypes.CASHBACK]: isAndroidOS ? '61%' : '70%',
  [transactionTypes.VISA_SIGNATURE_CARD_INSURANCE]: isAndroidOS ? '53%' : '62%',
  [transactionTypes.ATM]: isAndroidOS ? '77%' : '84%',
  [transactionTypes.LOCAL_TRANSFER]: isAndroidOS ? '95%' : '100%',
  [transactionTypes.APPLE_PAY_TOP_UP]: isAndroidOS ? '53%' : '62%',
};

export { typeFieldMapping, heightMapping };
