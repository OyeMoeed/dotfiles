import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef } from 'react';
import MapView from 'react-native-maps';
import { IPayMapViewProps } from './ipay-map-view.interface';
import mapViewStyles from './ipay-map-view.style';

const IPayMapView = forwardRef<MapView, IPayMapViewProps>(
  (
    {
      testID,
      style,
      initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      showsUserLocation = false,
      showsMyLocationButton = false,
      children,
      onRegionChangeComplete,
      onUserLocationChangeData,
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const styles = mapViewStyles(colors);
    const mapStyles = style || {};
    return (
      <MapView
        testID={`${testID}-map-view`}
        ref={ref}
        style={[styles.mapView, mapStyles]}
        initialRegion={initialRegion}
        showsUserLocation={showsUserLocation}
        showsMyLocationButton={showsMyLocationButton}
        onRegionChangeComplete={onRegionChangeComplete}
        onUserLocationChange={onUserLocationChangeData}
      >
        {children}
      </MapView>
    );
  },
);

export default IPayMapView;
