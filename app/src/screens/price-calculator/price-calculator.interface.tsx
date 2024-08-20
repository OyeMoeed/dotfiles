// ConversionDetails.interface.ts

interface TransactionDetails {
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
//enum for filter types
export enum FilterType {
  Country = 'Country',
  DeliveryType = 'DeliveryType',
  Currency = 'Currency',
}

export interface ConversionDetailsProps {
  data: TransactionDetails[];
}
