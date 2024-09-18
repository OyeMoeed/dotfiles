import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayHeadlineText,
  IPayIcon,
  IPayImage,
  IPayMapView,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayChip } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useMemo } from 'react';
import { IPayAtmDetailsProps } from './ipay-atm-details.interface';
import atmDetailsStyle from './ipay-atm-details.style';
import { Marker } from 'react-native-maps';
import images from '@app/assets/images';

const IPayAtmDetails: React.FC<IPayAtmDetailsProps> = ({ testID, style, data, openGoogleMapsWeb }) => {
  const { colors } = useTheme();
  const styles = atmDetailsStyle(colors);
  const localizationText = useLocalization();
  const { title, address, distance, type, location } = data;
  const initialRegion = { ...constants.INITIAL_REGION, longitude: location?.longitude, latitude: location?.latitude };

  const memoizedDistance = useMemo(() => {
    const distanceInKm = distance && distance.replace('.', ',');
    return `${distanceInKm} ${localizationText.COMMON.KM}`;
  }, [distance, localizationText]);

  const onPressGetDirection = () => {
    const { latitude, longitude } = location;
    if (openGoogleMapsWeb) openGoogleMapsWeb(latitude, longitude);
  };

  return (
    <IPayView testID={`${testID}-atm-details`} style={[styles.container, style]}>
      <IPayView style={styles.topView}>
        <IPayView style={styles.atmDetailsView}>
          <IPayHeadlineText regular={false} text={title} style={styles.titleText} />
          <IPayCaption1Text regular={false} text={memoizedDistance} color={colors.secondary.secondary500} />
        </IPayView>
        <IPayView style={styles.typeView}>
          <IPayChip
            isShowIcon={false}
            textElement={<IPayCaption2Text text={type} />}
            containerStyle={styles.chipContainerStyle}
          />
          <IPayCaption1Text text="-" style={styles.dash} />
          <IPayCaption1Text text={localizationText.ATM_WITHDRAWAL.ALINMA_ATM} color={colors.natural.natural900} />
        </IPayView>
      </IPayView>

      <IPayView style={styles.bottomView}>
        <IPayFootnoteText text={address} color={colors.primary.primary800} />

        <IPayView style={styles.mapView}>
          <IPayMapView initialRegion={initialRegion} >
          <Marker
              coordinate={initialRegion}
              
            >
              <IPayImage image={images.location} style={styles.marker} resizeMode="contain" />
            </Marker>
          </IPayMapView>
        </IPayView>

        <IPayButton
          onPress={onPressGetDirection}
          btnType={buttonVariants.PRIMARY}
          large
          btnText={localizationText.ATM_WITHDRAWAL.GET_DIRECTION}
          rightIcon={<IPayIcon icon={icons.add_location} size={20} color={colors.natural.natural0} />}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayAtmDetails;
