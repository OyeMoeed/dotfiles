import React from 'react';
import { MapStyleElement } from 'react-native-maps';

export interface InitialRegionProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface IPayMapViewProps {
  testID?: string;
  style?: MapStyleElement;
  initialRegion: InitialRegionProps;
  showsUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  children?: React.ReactNode;
  onRegionChangeComplete?: () => void;
  onUserLocationChangeData?: () => void;
}
