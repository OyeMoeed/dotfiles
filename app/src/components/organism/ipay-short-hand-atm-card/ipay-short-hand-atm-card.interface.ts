export type CardDetails = {
  title: string;
  cardNumber: string;
  cardType: string;
};

export interface IPayShortHandATMCardProps {
  textID?: string;
  cardData: any;
}
