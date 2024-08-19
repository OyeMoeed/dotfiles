import CardDetails from '@app/enums/card-types.enum';

interface IPayDescriptiveCardProps {
  testID: string;
  onCardPress: () => void;
  cardType: typeof CardDetails;
  data: CategoriesItem;
  onPricePress: () => void;
}

interface CategoriesItem {
  price: string;
  discount: string;
  code: string;
  desc: string;
  iconUrl: string;
  category: string;
  categoryDesc: string;
}

export { CategoriesItem, IPayDescriptiveCardProps };
