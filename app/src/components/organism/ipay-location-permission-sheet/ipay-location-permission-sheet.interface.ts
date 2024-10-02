import { GeoCoordinates } from 'react-native-geolocation-service';

export interface IPayLocationPermissionSheetProps {
  onLocationSelected: (position: GeoCoordinates) => void | Promise<void>;
}
