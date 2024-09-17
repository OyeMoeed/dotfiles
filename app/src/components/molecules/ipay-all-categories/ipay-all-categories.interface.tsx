import { MarketPlaceCategoriesProps } from '@app/screens/marketplace/marketplace.interface';

interface CategoriesItem {
  image: string;
  title: string;
}
interface IPayAllCategoriesProps {
  testID?: string;
  onPress?: (category?: MarketPlaceCategoriesProps) => void;
  data: MarketPlaceCategoriesProps[];
}

export { CategoriesItem, IPayAllCategoriesProps };
