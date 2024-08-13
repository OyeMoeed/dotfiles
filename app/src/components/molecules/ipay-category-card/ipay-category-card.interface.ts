import { StyleProp, ViewStyle } from 'react-native';

interface CategoryItem {
  id?: string;
  title: string;
  image: string;
}

interface IPayCategoryProps {
  testID?: string;
  item: CategoryItem;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  cardContainerStyle?: StyleProp<ViewStyle>;
}

export default IPayCategoryProps;
