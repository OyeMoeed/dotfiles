import { ViewStyle } from 'react-native';

interface IPaySelectCityComponentProps {
  testID?: string;
  style?: ViewStyle;
  data?: CityItem[];
  onSelectCity: (arg0: string) => void;
}

// Define the type for each city item
interface CityItem {
  id: number;
  cityName: string;
}

// Props for the function component that renders city names
interface CityItemProps {
  item: CityItem;
}

// Interface for the Ref Object
interface IPaySelectCityComponentRef {
  resetSelectedCity: () => void;
}

export { CityItem, CityItemProps, IPaySelectCityComponentProps, IPaySelectCityComponentRef };
