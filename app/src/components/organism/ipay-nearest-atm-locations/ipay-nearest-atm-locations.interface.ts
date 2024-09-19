import { ViewStyle } from 'react-native';

interface LocationProps {
  latitude?: number;
  longitude?: number;
}

interface AtmDetailsProps {
  type: string;
  title: string;
  address: string;
  distance: string;
  location: LocationProps;
}

interface IPayNearestAtmLocationsProps {
  testID?: string;
  style?: ViewStyle;
  nearestAtms: AtmDetailsProps[] | null;
  onPressAtmCard: (atmData: AtmDetailsProps) => void;
}

export { AtmDetailsProps, IPayNearestAtmLocationsProps };
