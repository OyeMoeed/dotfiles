type CardDetails = {
  title: string;
  cardNumber: string;
  cardType: string;
};

export interface ipayShortHandATMCardProps {
  textID?: string;
  cardData: CardDetails;
}
