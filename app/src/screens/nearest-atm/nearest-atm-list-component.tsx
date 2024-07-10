import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { AtmProps, NearestAtmListComponentProps } from './nearest-atm-list.interface';
import nearestAtmStyles from './nearest-atm.style';

const NearestAtmListComponent: React.FC<NearestAtmListComponentProps> = ({ testID, onPressAtmCard, nearestAtms }) => {
  const { colors } = useTheme();
  const styles = nearestAtmStyles(colors);

  const renderAtms = ({ item }: AtmProps) => (
    <IPayPressable style={styles.atmCard} onPress={() => onPressAtmCard(item)}>
      <IPayView style={styles.addressView}>
        <IPayCaption1Text text={item.type} style={styles.typeText} />
        <IPayFootnoteText text={item.address} style={styles.addressText} numberOfLines={2} />
      </IPayView>
      <IPayView style={styles.distanceView}>
        <IPaySubHeadlineText regular text={item.distance} style={styles.distanceText} />
        <IPayIcon icon={icons.infoIcon} />
      </IPayView>
    </IPayPressable>
  );
  return (
    <IPayView style={styles.atmListContainer} testID={`${testID}-atm-list`}>
      <IPayFlatlist
        data={nearestAtms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderAtms}
        itemSeparatorStyle={styles.itemSeparatorStyle}
      />
    </IPayView>
  );
};

export default NearestAtmListComponent;
