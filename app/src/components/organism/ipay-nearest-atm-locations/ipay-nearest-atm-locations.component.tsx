import images from '@app/assets/images';
import { IPayMapView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useRef } from 'react';
import { Marker } from 'react-native-maps';
import { IPayNearestAtmLocationsProps } from './ipay-nearest-atm-locations.interface';
import mapViewStyles from './ipay-nearest-atm-locations.style';

const IPayNearestAtmLocations: React.FC<IPayNearestAtmLocationsProps> = ({ testID, style }) => {
  const { colors } = useTheme();
  const styles = mapViewStyles(colors);
  const mapRef = useRef<any>(null);
  const nearestAtmFilters = ['All Types', 'Car', 'Branch', 'Lobby', 'Room'];

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const onSelectTab = () => {};
  return (
    <IPayView style={[styles.container, style]} testID={`${testID}-map-view`}>
      <IPayMapView ref={mapRef} initialRegion={initialRegion} showsUserLocation={true} showsMyLocationButton={false}>
        <Marker
          image={images.logoTab}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title="Alinma"
          description="Alinma Pay"
        />
      </IPayMapView>
    </IPayView>
  );
};

export default IPayNearestAtmLocations;
