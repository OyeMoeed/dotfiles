import { IPayCarousel } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { scaleSize } from '@app/styles/mixins';
import { cardTypes, CAROUSEL_MODES } from '@app/utilities/enums.util';
import { IPayTitle2Text, IPayView } from '@components/atoms';
import React from 'react';
import { Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import styles from './cards.style';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Cards: React.FC = () => {
  const localizationText = useLocalization();
  const cardData: CardInterface[] = [
    {
      name: 'Adam Ahmad',
      cardNumber: '*** **** **** 1111',
      cardVariant: cardTypes.CLASSIC,
      cardHeaderText: 'Classic Debit Card',
    },
    {
      name: 'Ali Hassan',
      cardNumber: '*** **** **** 2222',
      cardVariant: cardTypes.PLATINUM,
      cardHeaderText: 'Platinum Cashback Prepaid Card',
    },
    {
      name: 'Noman Javed',
      cardNumber: '*** **** **** 3333',
      cardVariant: cardTypes.SIGNATURE,
      cardHeaderText: 'Signature Prepaid Card',
    },
  ];

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayView style={styles.topDetails}>
        <IPayTitle2Text>{localizationText.cards}</IPayTitle2Text>
      </IPayView>
      <IPayView style={styles.cardsContainer}>
        <IPayCarousel
          data={cardData}
          modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: scaleSize(100) }}
          mode={CAROUSEL_MODES.PARALLAX}
          width={SCREEN_WIDTH}
          loop={false}
          height={verticalScale(350)}
          renderItem={({ item }) => <IPayATMCard item={item as CardInterface} />}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};
export default Cards;
