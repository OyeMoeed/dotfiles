// ConversionDetails.interface.ts
interface ConversionDetail {
  serviceName: string;
  conversionRate: string;
  fees: string;
  total: string;
  exchangeRate: string;
  serviceLogo: string;
  recordID: string;
  toConvert: string;
}

export interface IPayTransferServiceProps {
  item: ConversionDetail;
  testID?: string;
  selectedService: string;
  setSelectedService: (recordID: string) => void;
}
