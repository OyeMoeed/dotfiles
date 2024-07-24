interface ConverterItemProps {
  id: number;
  bankName: string;
  bankImage: string;
  sar: number;
  egp: number;
  balance: string;
  senderCurrency: string;
  converterCurrency: string;
  fee?: string;
}
export default ConverterItemProps;
