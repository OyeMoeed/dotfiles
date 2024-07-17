import { ViewStyle } from 'react-native';

interface LocationProps {
  latitude?: number;
  longitude?: number;
}

interface AtmDetailsProps {
  type?: string;
  title?: string;
  address?: string;
  distance?: string;
  location?: LocationProps;
}

interface IPayAtmDetailsProps {
  testID?: string;
  style?: ViewStyle;
  data: AtmDetailsProps;
  openGoogleMapsWeb: (latitude: number, longitude: number) => void;
}

export { AtmDetailsProps, IPayAtmDetailsProps, LocationProps };
