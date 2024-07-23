// ConversionDetails.interface.ts
export interface ConversionDetail {
  serviceName: string;
  conversionRate: string;
  fees: string;
  total: string;
  exchangeRate: string;
  serviceLogo: string;
  recordID: string;
}

export interface ConversionDetailsProps {
  data: ConversionDetail[];
}
