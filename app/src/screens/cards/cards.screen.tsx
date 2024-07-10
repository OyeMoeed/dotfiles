import icons from '@app/assets/icons';
import { IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayNoResult } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayCardIssueBottomSheet, IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { CAROUSEL_MODES, CardOptions } from '@app/utilities/enums.util';
import React, { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import cardData from './cards.constant';
import styles from './cards.style';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const Cards: React.FC = () => {
  const { colors } = useTheme();
  const cardSheetRef = useRef<any>();
  const localizationText = useLocalization();
  const [selectedCard, setSelectedCard] = useState<CardOptions>(CardOptions.VIRTUAL);
  const openCardSheet = () => {
    cardSheetRef.current.present();
  };
  const closeCardSheet = () => {
    cardSheetRef.current.close();
  };
  const handleNext = () => {
    cardSheetRef.current.close();
    navigate(screenNames.VIRTUAL_CARD);
  };

  const handleCardSelection = (cardType: CardOptions) => {
    setSelectedCard(cardType);
  };
  return (
    <IPaySafeAreaView testID="ipay-safearea" style={styles.container}>
      <IPayView style={styles.topDetails}>
        <IPayTitle2Text regular={false}>{localizationText.CARDS.CARDS}</IPayTitle2Text>
        <IPayButton
          small
          btnType="link-button"
          btnText={localizationText.CARDS.NEW_CARD}
          onPress={openCardSheet}
          rightIcon={<IPayIcon icon={icons.add_square} size={20} color={colors.primary.primary500} />}
        />
      </IPayView>
      {cardData.length ? (
        <IPayView style={styles.cardsContainer}>
          <IPayCarousel
            data={cardData}
            modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: scaleSize(100) }}
            mode={CAROUSEL_MODES.PARALLAX}
            width={SCREEN_WIDTH}
            loop={false}
            height={verticalScale(350)}
            renderItem={({ item }) => <IPayATMCard card={item as CardInterface} />}
          />
        </IPayView>
      ) : (
        <IPayView style={styles.noResultContainer}>
          <IPayNoResult
            testID="no-result"
            textColor={colors.primary.primary800}
            message={localizationText.CARDS.YOU_DO_NOT_HAVE_CARD}
            showEmptyBox
          />
          <IPayButton
            btnStyle={styles.buttonStyle}
            btnText={localizationText.CARDS.CREATE_NEW_CARD}
            btnType="primary"
            large
            leftIcon={<IPayIcon icon={icons.add} size={20} color={colors.natural.natural0} />}
          />
        </IPayView>
      )}
      <IPayBottomSheet
        heading={localizationText.CARD_ISSUE.ISSUE_NEW_CARD}
        onCloseBottomSheet={closeCardSheet}
        customSnapPoint={['20%', '66%']}
        ref={cardSheetRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        cancelBnt
      >
        <IPayCardIssueBottomSheet
          handleCardSelection={handleCardSelection}
          selectedCard={selectedCard}
          onNextPress={handleNext}
        />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};
export default Cards;
