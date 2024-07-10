import { ViewStyle } from 'react-native';

interface IPayNearestAtm {
  type: string;
  address: string;
  distance: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface IPayNearestAtmLocationsProps {
  testID?: string;
  style?: ViewStyle;
  nearestAtms: IPayNearestAtm[] | null;
}

export { IPayNearestAtm, IPayNearestAtmLocationsProps };
