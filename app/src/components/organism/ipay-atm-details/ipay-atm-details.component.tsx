import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayHeadlineText,
  IPayIcon,
  IPayMapView,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayChip } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { Linking, Platform } from 'react-native';
import { IPayAtmDetailsProps } from './ipay-atm-details.interface';
import atmDetailsStyle from './ipay-atm-details.style';

const IPayAtmDetails: React.FC<IPayAtmDetailsProps> = ({ testID, style, data }) => {
  const { colors } = useTheme();
  const styles = atmDetailsStyle(colors);
  const localizationText = useLocalization();
  const { address, distance, type, location } = data;
  const initialRegion = constants.INITIAL_REGION;
  const tempAddress: string = 'Irqah Governerate St, Irqah, Riyadh 12543, Saudi Arabia';

  const getDistance = () => {
    const distanceInKm = distance.replace('.', ',');
    return `${distanceInKm}  ${localizationText.COMMON.KM}`;
  };

  const openGoogleMapsWeb = () => {
    const { latitude, longitude } = location;

    const url = Platform.select({
      ios: `maps://app?daddr=${latitude},${longitude}&amp;ll=`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
    });

    Linking.openURL(url).catch((err) => {});
  };

  return (
    <IPayView testID={`${testID}-atm-details`} style={[styles.container, style]}>
      <IPayView style={styles.topView}>
        <IPayView style={styles.atmDetailsView}>
          <IPayHeadlineText regular={false} text={address} style={styles.addressText} />
          <IPayCaption1Text regular={false} text={getDistance()} color={colors.secondary.secondary500} />
        </IPayView>
        <IPayView style={styles.typeView}>
          <IPayChip isShowIcon={false} textElement={<IPayCaption2Text text={type} />} />
          <IPayCaption1Text text="-" style={styles.dash} />
          <IPayCaption1Text text={localizationText.ATM_WITHDRAWAL.ALINMA_ATM} color={colors.natural.natural900} />
        </IPayView>
      </IPayView>

      <IPayView style={styles.bottomView}>
        <IPayFootnoteText text={tempAddress} color={colors.primary.primary800} />

        <IPayView style={styles.mapView}>
          <IPayMapView initialRegion={initialRegion} />
        </IPayView>

        <IPayButton
          onPress={openGoogleMapsWeb}
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
