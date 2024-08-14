import CardDetails from '@app/enums/card-types.enum';

interface IPayDescriptiveCardProps {
  testID: string;
  onCardPress: () => void;
  cardType: typeof CardDetails;
  data: string;
  onPricePress: () => void;
}

interface CategoriesItem {
  image: string;
  isDiscounted: boolean;
  title: string;
  data: string;
  detail: string;
  price: string;
  discount: string;
}

export { CategoriesItem, IPayDescriptiveCardProps };
