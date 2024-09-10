import icons from '@app/assets/icons';
import { IPayIcon, IPaySpinner, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayNoResult } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { IPayBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPayCardIssueBottomSheet, IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import IPayCardSection from '@app/components/templates/ipay-card-details-section/ipay-card-details-section.component';
import IPayCardDetails from '@app/components/templates/ipay-card-details/ipay-card-details.component';
import { SNAP_POINT, SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import {
  CardListItem,
  CardsProp,
  getCardDetailsProp,
  prepareShowDetailsProp,
} from '@app/network/services/core/transaction/transaction.interface';
import {
  getCards,
  otpGetCardDetails,
  prepareShowCardDetails,
} from '@app/network/services/core/transaction/transactions.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import checkUserAccess from '@app/utilities/check-user-access';
import { CAROUSEL_MODES, CardOptions, CardStatusNumber, CardTypes } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { CardScreenCurrentState } from './cards.screen.interface';
import cardScreenStyles from './cards.style';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const CardsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = cardScreenStyles(colors);
  const cardDetailsSheetRef = useRef<any>(null);
  const cardSheetRef = useRef<any>(null);
  const localizationText = useLocalization();
  const [boxHeight, setBoxHeight] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<CardInterface>(); // #TODO will be replaced with API data

  const THRESHOLD = verticalScale(20);
  const HEIGHT = boxHeight - THRESHOLD;
  const sheetGradient = [colors.primary.primary10, colors.primary.primary10];
  const [selectedCard, setSelectedCard] = useState<CardOptions>(CardOptions.VIRTUAL);

  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [cardsData, setCardsData] = useState<CardInterface[]>([]);
  const [apiError, setAPIError] = useState<string>('');
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { otpConfig } = useConstantData();
  const helpCenterRef: any = useRef(null);
  const otpVerificationRef: any = useRef(null);
  const [otpRef, setOtpRef] = useState<string>('');
  const [cardDetails, setCardDetails] = useState<any>({});

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

  const prepareOtpCardDetails = async (showOtpSheet: boolean) => {
    const payload: prepareShowDetailsProp = {
      walletNumber,
      body: {
        cardIndex: currentCard?.cardIndex,
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      },
    };
    const apiResponse: any = await prepareShowCardDetails(payload);
    if (apiResponse.status.type === 'SUCCESS') {
      setOtpRef(apiResponse?.response?.otpRef as string);
      if (showOtpSheet) {
        setOtpSheetVisible(true);
        otpVerificationRef?.current?.present;
      }
    }
    otpVerificationRef?.current?.resetInterval();
  };

  const onPinCodeSheet = () => {
    prepareOtpCardDetails(true);
  };

  const onCloseCardSheet = () => {
    cardDetailsSheetRef.current.close();
  };

  const onChangeIndex = (index: number) => {
    setCurrentCard(cardsData[index]);
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

  const mapCardData = (cards: CardListItem[]) => {
    let mappedCards = [];
    mappedCards = cards.map((card: any) => ({
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
    }));
    return mappedCards;
  };
  const getCardsData = async () => {
    const payload: CardsProp = {
      walletNumber,
    };
    const apiResponse: any = await getCards(payload);

    if (apiResponse) {
      const availableCards = apiResponse?.response?.cards.filter(
        (card: any) =>
          card.cardStatus === CardStatusNumber.ActiveWithOnlinePurchase ||
          card.cardStatus === CardStatusNumber.ActiveWithoutOnlinePurchase ||
          card.cardStatus === CardStatusNumber.Freezed,
      );

      if (availableCards?.length) {
        setCardsData(mapCardData(availableCards));
        setCurrentCard(mapCardData(availableCards)[0]);
        setCardsCurrentState(CardScreenCurrentState.HAS_DATA);
      } else {
        setCardsCurrentState(CardScreenCurrentState.NO_DATA);
      }
    }
  };

  function onOtpCloseBottomSheet(): void {
    otpVerificationRef?.current?.resetInterval();
    setOtpSheetVisible(false);
  }

  const getCardDetails = async () => {
    const payload: getCardDetailsProp = {
      walletNumber,
      body: {
        cardIndex: currentCard?.cardIndex,
        otp,
        otpRef,
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      },
    };
    const apiResponse: any = await otpGetCardDetails(payload);

    if (apiResponse) {
      otpVerificationRef?.current?.resetInterval();
      setOtpSheetVisible(false);
      prepareCardInfoData(apiResponse?.response);
      cardDetailsSheetRef?.current?.present();
    }
  };

  const prepareCardInfoData = (data: any) => {
    let cardExpireDate = data?.expiryDate;
    let cardNumber = [...data?.cardNumber]
      .map((d, i) => (i % 4 == 0 ? ' ' + d : d))
      .join('')
      .trim();
    let cardInfo = {
      ...data,
      expiryDate: cardExpireDate,
      cardNumber: cardNumber,
    };

    setCardDetails(cardInfo);
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      // resetPassCode();
      getCardDetails();
    }
  };

  function handleOnPressHelp(): void {
    helpCenterRef?.current?.present;
  }

  const onResendCodePress = () => {
    prepareOtpCardDetails(false);
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
      <IPayPortalBottomSheet
        heading={localizationText.CARD_OPTIONS.CARD_DETAILS}
        enablePanDownToClose
        simpleBar
        bold
        cancelBnt
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onOtpCloseBottomSheet}
        isVisible={isOtpSheetVisible}
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={onConfirmOtp}
          mobileNumber={walletInfo?.mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          apiError={apiError}
          isBottomSheet={false}
          handleOnPressHelp={handleOnPressHelp}
          timeout={otpConfig.transaction.otpTimeout}
          onResendCodePress={onResendCodePress}
        />
      </IPayPortalBottomSheet>

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
        <IPayCardDetails cardDetails={cardDetails} />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.CARD_ISSUE.ISSUE_NEW_CARD}
        onCloseBottomSheet={closeCardSheet}
        customSnapPoint={SNAP_POINTS.MID_MEDUIM}
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
