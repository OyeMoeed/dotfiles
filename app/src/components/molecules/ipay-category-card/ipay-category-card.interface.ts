import { MarketPlaceCategoriesProps } from '@app/screens/marketplace/marketplace.interface';
import { StyleProp, ViewStyle } from 'react-native';

interface IPayCategoryProps {
  testID?: string;
  item: MarketPlaceCategoriesProps;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  cardContainerStyle?: StyleProp<ViewStyle>;
}

export default IPayCategoryProps;
