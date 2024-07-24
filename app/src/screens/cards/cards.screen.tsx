import icons from '@app/assets/icons';
import { IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayNoResult } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { IPayBottomSheet } from '@app/components/organism';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPayCardIssueBottomSheet, IPaySafeAreaView } from '@app/components/templates';
import IPayCardDetailsSection from '@app/components/templates/ipay-card-details-section/ipay-card-details-section.component';
import IPayCardDetails from '@app/components/templates/ipay-card-details/ipay-card-details.component';
import IPayCardPinCode from '@app/components/templates/ipay-card-pin-code/ipay-card-pin-code.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { CAROUSEL_MODES, CardOptions } from '@app/utilities/enums.util';
import React, { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import cardScreenStyles from './cards.style';
import useCardsData from './use-cards-data';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const CardsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { CARD_DATA } = useCardsData();
  const styles = cardScreenStyles(colors);
  const pinCodeBottomSheetRef = useRef<any>(null);
  const cardDetailsSheetRef = useRef<any>(null);
  const cardSheetRef = useRef<any>(null);
  const localizationText = useLocalization();
  const [boxHeight, setBoxHeight] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<CardInterface>(CARD_DATA[0]); // #TODO will be replaced with API data

  const THRESHOLD = verticalScale(20);
  const HEIGHT = boxHeight - THRESHOLD;
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
  const newCard = (
    <IPayView style={styles.newCardWrapper}>
      <IPayButton
        onPress={openCardSheet}
        btnType="outline"
        btnText={localizationText.CARDS.NEW_CARD}
        rightIcon={<IPayIcon icon={icons.add_square} size={20} color={colors.primary.primary500} />}
      />
    </IPayView>
  );

  const onClosePinCodeSheet = () => {
    pinCodeBottomSheetRef.current.close();
  };

  const onVerifyPin = () => {
    pinCodeBottomSheetRef.current.close();
    cardDetailsSheetRef.current.present();
  };

  const onPinCodeSheet = () => {
    pinCodeBottomSheetRef.current.present();
  };

  const onCloseCardSheet = () => {
    cardDetailsSheetRef.current.close();
  };

  const onChangeIndex = (index: number) => {
    setCurrentCard(CARD_DATA[index]);
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
      {CARD_DATA.length ? (
        <>
          <IPayView style={styles.cardsContainer}>
            <IPayCarousel
              data={[...CARD_DATA, { newCard: true }]}
              modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: scaleSize(100) }}
              mode={CAROUSEL_MODES.PARALLAX}
              width={SCREEN_WIDTH}
              loop={false}
              height={verticalScale(350)}
              onChangeIndex={onChangeIndex}
              renderItem={({ item }) =>
                (item as { newCard?: boolean }).newCard ? (
                  newCard
                ) : (
                  <IPayATMCard card={item as CardInterface} setBoxHeight={setBoxHeight} />
                )
              }
            />
          </IPayView>
          {boxHeight > 0 && (
            <IPayCustomSheet gradientHandler={false} boxHeight={HEIGHT} topScale={200}>
              <IPayCardDetailsSection currentCard={currentCard} onOpenOTPSheet={onPinCodeSheet} />
            </IPayCustomSheet>
          )}
        </>
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
        heading={localizationText.CARDS.CARD_DETAILS}
        customSnapPoint={['1%', '95%']}
        onCloseBottomSheet={onClosePinCodeSheet}
        ref={pinCodeBottomSheetRef}
        simpleBar
        cancelBnt
        bold
      >
        <IPayCardPinCode onEnterPassCode={onVerifyPin} />
      </IPayBottomSheet>
      <IPayBottomSheet
        ref={cardDetailsSheetRef}
        heading={localizationText.CARDS.CARD_DETAILS}
        customSnapPoint={['1%', '60%']}
        onCloseBottomSheet={onCloseCardSheet}
        simpleBar
        cancelBnt
        bold
      >
        <IPayCardDetails />
      </IPayBottomSheet>
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
export default CardsScreen;
