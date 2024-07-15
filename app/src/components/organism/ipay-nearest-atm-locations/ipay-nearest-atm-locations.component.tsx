import images from '@app/assets/images';
import { IPayImage, IPayMapView, IPayView } from '@app/components/atoms';
import constants from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useRef } from 'react';
import { Marker } from 'react-native-maps';
import { IPayNearestAtmLocationsProps } from './ipay-nearest-atm-locations.interface';
import mapViewStyles from './ipay-nearest-atm-locations.style';

const IPayNearestAtmLocations: React.FC<IPayNearestAtmLocationsProps> = ({ testID, style, nearestAtms }) => {
  const { colors } = useTheme();
  const styles = mapViewStyles(colors);
  const mapRef = useRef<any>(null);

  const initialRegion = constants.INITIAL_REGION;

  return (
    <IPayView style={[styles.container, style]} testID={`${testID}-map-view`}>
      <IPayMapView
        ref={mapRef}
        initialRegion={initialRegion}
        testID={`${testID}-map-view`}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {nearestAtms &&
          nearestAtms.map((atm, index) => (
            <Marker
              key={`${index}`}
              coordinate={atm?.location}
              title={atm?.type}
              description={atm?.address}
              testID={`marker-${index}`}
            >
              <IPayImage image={images.location} style={styles.marker} resizeMode="contain" />
            </Marker>
          ))}
      </IPayMapView>
    </IPayView>
  );
};

export default IPayNearestAtmLocations;
