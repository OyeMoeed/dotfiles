import { GeoCoordinates } from 'react-native-geolocation-service';

interface AtmDetailsProps {
  type: string;
  city?: string;
  title: string;
  address: string;
  distance: string;
  location: GeoCoordinates;
}

interface AtmProps {
  item: AtmDetailsProps;
  index: number;
}

interface NearestAtmListComponentProps {
  testID?: string;
  onPressAtmCard: (arg0: AtmDetailsProps) => void;
  nearestAtms: AtmDetailsProps[] | null;
}

export { AtmDetailsProps, AtmProps, NearestAtmListComponentProps };
