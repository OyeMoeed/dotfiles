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

interface AtmProps {
  item: AtmDetailsProps;
}

interface NearestAtmListComponentProps {
  testID?: string;
  onPressAtmCard: (arg0: AtmDetailsProps) => void;
  nearestAtms: AtmDetailsProps[] | null;
}

export { AtmDetailsProps, AtmProps, NearestAtmListComponentProps };
