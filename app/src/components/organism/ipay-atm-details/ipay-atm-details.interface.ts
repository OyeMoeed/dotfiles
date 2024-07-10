import { ViewStyle } from 'react-native';

interface LocationProps {
  latitude?: number;
  longitude?: number;
}

interface AtmDetailsProps {
  type?: string;
  address?: string;
  distance?: string;
  location?: LocationProps;
}

export interface IPayAtmDetailsProps {
  testID?: string;
  style?: ViewStyle;
  data: AtmDetailsProps;
}
