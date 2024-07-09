import { IPayCarousel } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayCardDetailsSection from '@app/components/templates/ipay-card-details-section/ipay-card-details-section.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { scaleSize } from '@app/styles/mixins';
import { CardCategories, CAROUSEL_MODES } from '@app/utilities/enums.util';
import { IPayTitle2Text, IPayView } from '@components/atoms';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import styles from './cards.style';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Cards: React.FC = () => {
  const localizationText = useLocalization();
  const [boxHeight, setBoxHeight] = useState(0);
  const THRESHOLD = verticalScale(20);
  const HEIGHT = boxHeight - THRESHOLD;
  const cardData: CardInterface[] = [
    // TODO this have to be replaced with actual api data
    {
      name: 'Adam Ahmad',
      cardNumber: '*** **** **** 1111',
      cardType: CardCategories.CLASSIC,
      cardHeaderText: 'Classic Debit Card',
    },
    {
      name: 'Ali Hassan',
      cardNumber: '*** **** **** 2222',
      cardType: CardCategories.PLATINUM,
      cardHeaderText: 'Platinum Cashback Prepaid Card',
    },
    {
      name: 'Noman Javed',
      cardNumber: '*** **** **** 3333',
      cardType: CardCategories.SIGNATURE,
      cardHeaderText: 'Signature Prepaid Card',
    },
  ];

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayView style={styles.topDetails}>
        <IPayTitle2Text>{localizationText.HOME.CARDS}</IPayTitle2Text>
      </IPayView>
      <IPayView style={styles.cardsContainer}>
        <IPayCarousel
          data={cardData}
          modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: scaleSize(100) }}
          mode={CAROUSEL_MODES.PARALLAX}
          width={SCREEN_WIDTH}
          loop={false}
          height={verticalScale(350)}
          renderItem={({ item }) => <IPayATMCard setBoxHeight={setBoxHeight} card={item as CardInterface} />}
        />
      </IPayView>
      {boxHeight > 0 ? (
        <IPayCustomSheet gradientHandler={false} boxHeight={HEIGHT} topScale={200}>
          <IPayCardDetailsSection />
        </IPayCustomSheet>
      ) : (
        <IPayView />
      )}
    </IPaySafeAreaView>
  );
};
export default Cards;
