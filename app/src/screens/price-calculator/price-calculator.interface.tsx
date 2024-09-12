// ConversionDetails.interface.ts

export interface TransactionDetails {
  serviceName: string;
  conversionRate: string;
  fees: string;
  total: string;
  exchangeRate: string;
  serviceLogo: string;
  recordID: string;
  toConvert: string;
  currency?: string;
}
// enum for filter types
export enum FilterType {
  Country = 'Country',
  TransferMethod = 'TransferMethod',
  Currency = 'Currency',
}
export interface dropDownItem {
  id: string;
  text: string;
}

export interface TransactionDetailsProps {
  data: TransactionDetails[];
}
