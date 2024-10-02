import { ViewStyle } from 'react-native';
import { GeoCoordinates } from 'react-native-geolocation-service';

interface AtmDetailsProps {
  type: string;
  title: string;
  address: string;
  distance: string;
  location: GeoCoordinates;
}

interface IPayNearestAtmLocationsProps {
  testID?: string;
  style?: ViewStyle;
  nearestAtms: AtmDetailsProps[] | null;
  onPressAtmCard: (atmData: AtmDetailsProps) => void;
}

export { AtmDetailsProps, IPayNearestAtmLocationsProps };
