import images from '@app/assets/images';
import { IPayImage, IPayMapView, IPayView } from '@app/components/atoms';
import constants from '@app/constants/constants';
import React, { useRef } from 'react';
import { Marker } from 'react-native-maps';
import { IPayNearestAtmLocationsProps } from './ipay-nearest-atm-locations.interface';
import mapViewStyles from './ipay-nearest-atm-locations.style';

const IPayNearestAtmLocations: React.FC<IPayNearestAtmLocationsProps> = ({
  testID,
  style,
  nearestAtms,
  onPressAtmCard,
}) => {
  const styles = mapViewStyles();
  const mapRef = useRef<any>(null);

  let initialRegion = constants.INITIAL_REGION;

  if (nearestAtms && nearestAtms[0]) {
    initialRegion = {
      ...constants.INITIAL_REGION,
      latitude: nearestAtms[0].location?.latitude as number,
      longitude: nearestAtms[0].location?.longitude as number,
    };
  }

  return (
    <IPayView style={[styles.container, style]} testID={`${testID}-map-view`}>
      <IPayMapView
        ref={mapRef}
        initialRegion={initialRegion}
        testID={`${testID}-map-view`}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {nearestAtms &&
          nearestAtms.map((atm, index) => (
            <Marker
              key={`${`${index}-map-marker`}`}
              coordinate={atm?.location}
              title={atm?.type}
              description={atm?.address}
              testID={`marker-${index}`}
              onPress={() => {
                onPressAtmCard(atm);
              }}
            >
              <IPayImage image={images.location} style={styles.marker} resizeMode="contain" />
            </Marker>
          ))}
      </IPayMapView>
    </IPayView>
  );
};

export default IPayNearestAtmLocations;
