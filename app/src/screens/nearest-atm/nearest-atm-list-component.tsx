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
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { AtmProps, NearestAtmListComponentProps } from './nearest-atm-list.interface';
import nearestAtmStyles from './nearest-atm.style';

const NearestAtmListComponent: React.FC<NearestAtmListComponentProps> = ({ testID, onPressAtmCard, nearestAtms }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = nearestAtmStyles(colors);
  const getDistance = (distance: string | number) => `${distance}  ${t('COMMON.KM')}`;

  const renderAtms = ({ item, index }: AtmProps) => (
    <IPayView>
      <IPayPressable style={styles.atmCard} key={item.address} onPress={() => onPressAtmCard(item)}>
        <IPayView style={styles.titleView}>
          <IPayCaption1Text text={item.type} style={styles.typeText} color={colors.natural.natural700} />
          <IPayView style={styles.fill}>
            <IPayFootnoteText text={item.title} style={styles.titleText} numberOfLines={2} />
          </IPayView>
        </IPayView>
        <IPayView style={styles.distanceView}>
          <IPaySubHeadlineText regular text={getDistance(item?.distance)} style={styles.distanceText} />
          <IPayIcon icon={icons.infoIcon} />
        </IPayView>
      </IPayPressable>
      {index + 1 === nearestAtms?.length && (
        <IPayFootnoteText text={t('ATM_WITHDRAWAL.NO_MORE_BRANCHES_OR_ATMS')} style={styles.noMoreNearestAtms} />
      )}
    </IPayView>
  );
  return (
    <IPayView style={styles.atmListContainer} testID={`${testID}-atm-list`}>
      <IPayFlatlist
        data={nearestAtms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderAtms}
        itemSeparatorStyle={StyleSheet.flatten(styles.itemSeparatorStyle)}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<IPayView style={styles.listFooterStyle} />}
      />
    </IPayView>
  );
};

export default NearestAtmListComponent;
