
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
  fromAmount?: string;
  fromCurrency?: string;
  toAmount?: string;
  toCurrency?: string;
}

export interface IPayTransactionServiceProps {
  transaction: TransactionDetails;
  testID?: string;
  selectedService: string;
  setSelectedService: (recordID: string) => void;
}
