import { ViewStyle } from 'react-native';
import { GeoCoordinates } from 'react-native-geolocation-service';

interface AtmDetailsProps {
  type?: string;
  title?: string;
  address?: string;
  distance?: string;
  location?: GeoCoordinates;
}

interface IPayAtmDetailsProps {
  testID?: string;
  style?: ViewStyle;
  data: AtmDetailsProps;
  openGoogleMapsWeb: (latitude: number, longitude: number) => void;
}

export { AtmDetailsProps, IPayAtmDetailsProps };
