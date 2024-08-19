import icons from '@app/assets/icons';
import images from '@app/assets/images';

interface TransferDataItem {
  id: string;
  label: string;
  value: string;
  image?: string;
  icon?: string;
}

const internationalTransferData = [
  { id: '1', label: 'Beneficiary', value: 'Ahmed Mohamed' },
  { id: '2', label: 'Country', value: 'Egypt', image: images.egyFlag },
  { id: '3', label: 'Transaction ID', value: '21523325', icon: icons.copy },
  { id: '4', label: 'Bank Transfer', value: 'AlinmaPay Direct' },
  { id: '5', label: 'IBAN', value: 'SA380019000500000000263180' },
  { id: '6', label: 'Bank Name', value: 'FAB1 Misr' },
  { id: '7', label: 'Phone Number', value: '+20 01178598745' },
  { id: '8', label: 'Reason of Transfer', value: 'Family and friends' },
  { id: '9', label: 'Amount (SAR)', value: '50 SAR' },
  { id: '10', label: 'Amount (EGP)', value: '634.51 EGP' },
  { id: '11', label: 'Exchange Rate', value: '12.69' },
  { id: '12', label: 'VAT (15%)', value: '10 SAR' },
  { id: '13', label: 'Fees', value: '10 SAR' },
  { id: '14', label: 'Total Amount', value: '50 SAR' },
];

enum InternationalTransferDataLabels {
  beneficiary = 'Beneficiary',
  country = 'Country',
  transaction_id = 'Transaction ID',
  bank_transfer = 'Bank Transfer',
  iban = 'IBAN',
  bank_name = 'Bank Name',
  phone_number = 'Phone Number',
  reason_of_transfer = 'Reason of Transfer',
  amount_sar = 'Amount (SAR)',
  amount_egp = 'Amount (EGP)',
  exchange_rate = 'Exchange Rate',
  vat = 'VAT (15%)',
  fees = 'Fees',
  total_amount = 'Total Amount',
}

enum RecieverInfo {
  beneficiary = 'Beneficiary',
  country = 'Country',
  bank_transfer = 'Bank Transfer',
  iban = 'IBAN',
  bank_name = 'Bank Name',
}

enum TransferInfoListedData {
  amount_sar = 'Amount (SAR)',
  amount_egp = 'Amount (EGP)',
  exchange_rate = 'Exchange Rate',
  vat = 'VAT (15%)',
  fees = 'Fees',
  total_amount = 'Total Amount',
}

enum InternationalTransferLocalizationKeysMapping {
  beneficiary = 'BENEFICIARY',
  country = 'COUNTRY',
  transaction_id = ' TRANSACTION_ID',
  bank_transfer = 'BANK_TRANSFER',
  iban = 'IBAN',
  bank_name = 'BANK_NAME',
  phone_number = 'PHONE_NUMBER',
  reason_of_transfer = 'REASON_OF_TRANSFER',
  amount_sar = 'AMOUNT_SAR',
  amount_egp = 'AMOUNT_EGP',
  exchange_rate = 'EXCHANGE_RATE',
  vat = 'VAT',
  fees = 'FEES',
  total_amount = 'TOTAL_AMOUNT',
}

export {
  InternationalTransferDataLabels,
  InternationalTransferLocalizationKeysMapping,
  RecieverInfo,
  TransferDataItem,
  TransferInfoListedData,
  internationalTransferData,
};
