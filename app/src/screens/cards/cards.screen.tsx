import icons from '@app/assets/icons';
import { IPayIcon, IPaySpinner, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayButton, IPayCarousel, IPayNoResult } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPayCardIssueBottomSheet, IPaySafeAreaView } from '@app/components/templates';
import IPayCardSection from '@app/components/templates/ipay-card-details-section/ipay-card-details-section.component';
import IPayCardDetails from '@app/components/templates/ipay-card-details/ipay-card-details.component';
import IPayCardPinCode from '@app/components/templates/ipay-card-pin-code/ipay-card-pin-code.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { CardListItem, CardsProp } from '@app/network/services/core/transaction/transaction.interface';
import { getCards } from '@app/network/services/core/transaction/transactions.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import checkUserAccess from '@app/utilities/check-user-access';
import { isAndroidOS } from '@app/utilities/constants';
import {
  ApiResponseStatusType,
  CAROUSEL_MODES,
  CardOptions,
  CardStatusNumber,
  CardTypes,
  spinnerVariant,
} from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { CardScreenCurrentState } from './cards.screen.interface';
import cardScreenStyles from './cards.style';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const CardsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = cardScreenStyles(colors);
  const pinCodeBottomSheetRef = useRef<any>(null);
  const cardDetailsSheetRef = useRef<any>(null);
  const cardSheetRef = useRef<any>(null);
  const localizationText = useLocalization();
  const [boxHeight, setBoxHeight] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<CardInterface>(); // #TODO will be replaced with API data

  const THRESHOLD = verticalScale(20);
  const HEIGHT = boxHeight - THRESHOLD;
  const sheetGradient = [colors.primary.primary10, colors.primary.primary10];
  const [selectedCard, setSelectedCard] = useState<CardOptions>(CardOptions.VIRTUAL);

  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const [cardsData, setCardsData] = useState<CardInterface[]>([]);
  const [apiError, setAPIError] = useState<string>('');
  const { showToast } = useToastContext();

  const [cardsCurrentState, setCardsCurrentState] = useState<CardScreenCurrentState>(CardScreenCurrentState.FETCHING);

  const openCardSheet = () => {
    const hasAccess = checkUserAccess();
    if (hasAccess) {
      cardSheetRef.current.present();
    }
  };
  const closeCardSheet = () => {
    cardSheetRef.current.close();
  };
  const handleNext = () => {
    cardSheetRef.current.close();
    if (selectedCard === CardOptions.VIRTUAL) {
      navigate(screenNames.VIRTUAL_CARD);
    } else {
      navigate(screenNames.PHYSICAL_CARD_MAIN);
    }
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
    console.log(index);
    setCurrentCard(cardsData[index]);
  };

  const renderSpinner = useCallback((isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  }, []);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };
  const getCardDesc = (cardType: CardTypes) => {
    switch (cardType) {
      case CardTypes.PLATINUM:
        return localizationText.CARDS.PLATINUM_CASHBACK_PREPAID_CARD;

      case CardTypes.SIGNATURE:
        return localizationText.CARDS.SIGNATURE_PREPAID_CARD;

      case CardTypes.CLASSIC:
        return localizationText.CARDS.CLASSIC_DEBIT_CARD;

      default:
        break;
    }
  };

  const currentYear: number = new Date().getFullYear();

  const mapCardData = (cards: CardListItem[]) => {
    let mappedCards = [];
    mappedCards = cards.map((card: any) => {
      return {
        name: card?.linkedName?.embossingName,
        cardType: card?.cardTypeId,
        cardHeaderText: getCardDesc(card?.cardTypeId),
        expired: card?.reissueDue,
        frozen: card.cardStatus == CardStatusNumber.Freezed,
        suspended: false,
        maskedCardNumber: `**** **** **** **${card.lastDigits}`,
        cardNumber: card.lastDigits,
        creditCardDetails: {
          availableBalance: '5200.40',
        },
        totalCashbackAmt: card.totalCashbackAmt,
        ...card,
      };
    });
    return mappedCards;
  };
  const getCardsData = async () => {
    renderSpinner(true);
    try {
      const payload: CardsProp = {
        walletNumber,
      };
      const apiResponse: any = await getCards(payload);
      renderSpinner(false);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          let availableCards = apiResponse?.response?.cards.filter((card: any) => {
            return (
              card.cardStatus == CardStatusNumber.ActiveWithOnlinePurchase ||
              card.cardStatus == CardStatusNumber.ActiveWithoutOnlinePurchase ||
              card.cardStatus == CardStatusNumber.Freezed
            );
          });

          if (availableCards?.length) {
            setCardsData(mapCardData(availableCards));
            setCurrentCard(mapCardData(availableCards)[0]);
            setCardsCurrentState(CardScreenCurrentState.HAS_DATA);
          } else {
            setCardsCurrentState(CardScreenCurrentState.NO_DATA);
          }
          break;
        case apiResponse?.apiResponseNotOk:
          renderSpinner(false);
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          setCardsCurrentState(CardScreenCurrentState.NO_DATA);
          break;
        case ApiResponseStatusType.FAILURE:
          renderSpinner(false);
          setAPIError(apiResponse?.error);
          setCardsCurrentState(CardScreenCurrentState.NO_DATA);
          break;
        default:
          renderSpinner(false);
          setCardsCurrentState(CardScreenCurrentState.NO_DATA);
          break;
      }
    } catch (error: any) {
      renderSpinner(false);
      setCardsCurrentState(CardScreenCurrentState.NO_DATA);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    getCardsData();
  }, []);

  const renderCardsCurrentState = () => {
    switch (cardsCurrentState) {
      case CardScreenCurrentState.FETCHING:
        return <IPaySpinner testID="spinner" />;
      case CardScreenCurrentState.NO_DATA:
        return (
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
              onPress={openCardSheet}
              leftIcon={<IPayIcon icon={icons.add} size={20} color={colors.natural.natural0} />}
            />
          </IPayView>
        );
      case CardScreenCurrentState.HAS_DATA:
        return (
          <>
            <IPayView style={styles.cardsContainer}>
              <IPayCarousel
                data={[...cardsData, { newCard: true }]}
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
            {boxHeight > 0 && currentCard && (
              <IPayCustomSheet gradientHandler={false} boxHeight={HEIGHT} topScale={200}>
                <IPayCardSection currentCard={currentCard} onOpenOTPSheet={onPinCodeSheet} cards={cardsData} />
              </IPayCustomSheet>
            )}
          </>
        );
      default:
        return null;
    }
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
      {renderCardsCurrentState()}
      <IPayBottomSheet
        heading={localizationText.CARDS.CARD_DETAILS}
        customSnapPoint={['1%', isAndroidOS ? '95%' : '99%']}
        onCloseBottomSheet={onClosePinCodeSheet}
        ref={pinCodeBottomSheetRef}
        simpleBar
        cancelBnt
        bold
        headerContainerStyles={styles.sheetHeader}
        bgGradientColors={sheetGradient}
        bottomSheetBgStyles={styles.sheetBackground}
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
        headerContainerStyles={styles.sheetHeader}
        bgGradientColors={sheetGradient}
        bottomSheetBgStyles={styles.sheetBackground}
      >
        <IPayCardDetails />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.CARD_ISSUE.ISSUE_NEW_CARD}
        onCloseBottomSheet={closeCardSheet}
        customSnapPoint={['20%', '70%']}
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
