import { MarketPlaceCategoriesProps } from '@app/screens/marketplace/marketplace.interface';
import { StyleProp, ViewStyle } from 'react-native';

interface IPayCategoryProps {
  testID?: string;
  item: MarketPlaceCategoriesProps;
  onPressCategory?: (category?: MarketPlaceCategoriesProps) => void;
  style?: StyleProp<ViewStyle>;
  cardContainerStyle?: StyleProp<ViewStyle>;
}

export default IPayCategoryProps;
