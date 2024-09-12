import CardDetails from '@app/enums/card-types.enum';

interface IPayDescriptiveCardProps {
  testID: string;
  onCardPress: (code: string) => void;
  cardType: CardDetails;
  data: CategoryItem;
  onPricePress: () => void;
}

interface CategoryItem {
  price: string;
  discount: string;
  code: string;
  desc: string;
  iconUrl: string;
  category: string;
  categoryDesc: string;
}

export { CategoryItem, IPayDescriptiveCardProps };
