
interface TransactionDetails {
  serviceName: string;
  conversionRate: string;
  fees: string;
  total: string;
  exchangeRate: string;
  serviceLogo: string;
  recordID: string;
  toConvert: string;
  currency?:string;
}

export interface IPayTransactionServiceProps {
  item: TransactionDetails;
  testID?: string;
  selectedService: string;
  setSelectedService: (recordID: string) => void;
}
