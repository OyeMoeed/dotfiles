import React from 'react';

import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';

import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useLocalization from '@app/localization/hooks/localization.hook';
import IPayLatestOfferCard from '@app/components/molecules/ipay-latest-offers-card/ipay-latest-offers-card.component';

import { navigate } from '@app/navigation/navigation-service.navigation';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';

import offersListStyles from './offers-list.style';

const OffersListScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = offersListStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView>
      <IPayHeader
        title={localizationText.OFFERS.OFFERS_TITLE}
        backBtn
        applyFlex
        rightComponent={
          <IPayPressable onPress={() => {}}>
            <IPayIcon icon={icons.filter} size={20} color={colors.primary.primary500} />
          </IPayPressable>
        }
      />
      <IPayView style={styles.container}>
        <IPayView style={styles.topTextContainer}>
          <IPayFootnoteText color={colors.natural.natural500} regular text={localizationText.OFFERS.AVAILABLE_OFFERS} />
          <IPayView style={styles.smallDOT} />
          <IPayCaption2Text
            regular
            text={`${5} ${localizationText.OFFERS.OFFERS_TITLE}`}
            color={colors.secondary.secondary500}
          />
        </IPayView>
        <IPayFlatlist
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={[{ id: '1', isSpecialOffer: true }, { id: '2' }, { id: '3' }, { id: '4' }]} // TODO: Adding dummy data for now untill api is implemented
          renderItem={({ item }) => (
            <IPayLatestOfferCard
              onPress={() => navigate(ScreenNames.OFFER_DETAILS)}
              offer={item}
              isSpecialOffer={item.isSpecialOffer}
              containerStyle={styles.offerContainerStyle}
              offerImageStyle={styles.offerImageStyle}
              lineImageStyle={styles.lineImageStyle}
            />
          )}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default OffersListScreen;
