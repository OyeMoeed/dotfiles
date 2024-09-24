import icons from '@app/assets/icons';
import { IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayNoResult } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPayCardIssueBottomSheet, IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import IPayCardSection from '@app/components/templates/ipay-card-details-section/ipay-card-details-section.component';
import IPayCardDetails from '@app/components/templates/ipay-card-details/ipay-card-details.component';
import IPayFreezeConfirmationSheet from '@app/components/templates/ipay-freeze-confirmation-sheet/ipay-freeze-confirmation-sheet.component';
import constants, { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
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
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import checkUserAccess from '@app/utilities/check-user-access';
import { CardOptions, CardStatusNumber, CardTypes, CarouselModes, buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import cardsListMock from '@app/network/services/core/transaction/cards-list.mock';
import { isAndroidOS } from '@app/utilities/constants';
import CardScreenCurrentState from './cards.screen.interface';
import cardScreenStyles from './cards.style';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const CardsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = cardScreenStyles(colors);
  const cardDetailsSheetRef = useRef<any>(null);
  const cardSheetRef = useRef<any>(null);
  const actionSheetRef = useRef<any>(null);
  const [boxHeight, setBoxHeight] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<CardInterface>(); // #TODO will be replaced with API data

  const THRESHOLD = verticalScale(20);
  const HEIGHT = boxHeight - THRESHOLD;
  const sheetGradient = [colors.primary.primary10, colors.primary.primary10];
  const [selectedCard, setSelectedCard] = useState<CardOptions>(CardOptions.VIRTUAL);

  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [cardsData, setCardsData] = useState<CardInterface[]>([]);
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const [isCardDetailsSheetVisible, setIsCardDetailsSheetVisible] = useState(false);
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isCardsSheetVisible, setIsCardSheetVisible] = useState<boolean>(false);
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
      setIsCardSheetVisible(true);
      cardSheetRef.current.present();
    }
  };
  const closeCardSheet = () => {
    setIsCardSheetVisible(false);
  };
  const handleNext = () => {
    setIsCardSheetVisible(false);
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
        btnType={buttonVariants.OUTLINED}
        btnText="CARDS.NEW_CARD"
        rightIcon={<IPayIcon icon={icons.add_square} size={20} color={colors.primary.primary500} />}
      />
    </IPayView>
  );

  const prepareOtpCardDetails = async (showOtpSheet: boolean) => {
    const hasAccess = checkUserAccess();
    if (hasAccess) {
      if (constants.MOCK_API_RESPONSE) {
        setOtpRef('1111');
        if (showOtpSheet) {
          setOtpSheetVisible(true);
          otpVerificationRef?.current?.present();
        }
        otpVerificationRef?.current?.resetInterval();
        return;
      }
      const payload: prepareShowDetailsProp = {
        walletNumber,
        body: {
          cardIndex: currentCard?.cardIndex,
          deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
        },
      };
      const apiResponse: any = await prepareShowCardDetails(payload);
      if (apiResponse) {
        setOtpRef(apiResponse?.response?.otpRef as string);
        if (showOtpSheet) {
          setOtpSheetVisible(true);
          otpVerificationRef?.current?.present();
        }
      }
      otpVerificationRef?.current?.resetInterval();
    }
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
        return t('CARDS.PLATINUM_CASHBACK_PREPAID_CARD');

      case CardTypes.SIGNATURE:
        return t('CARDS.SIGNATURE_PREPAID_CARD');

      case CardTypes.CLASSIC:
        return t('CARDS.CLASSIC_DEBIT_CARD');

      default:
        return '';
    }
  };

  const mapCardData = (cards: CardListItem[]) => {
    let mappedCards = [];
    mappedCards = cards.map((card: any) => ({
      name: card?.linkedName?.embossingName,
      cardType: card?.cardTypeId,
      cardHeaderText: getCardDesc(card?.cardTypeId),
      expired: card?.reissueDue,
      frozen: card.cardStatus === CardStatusNumber.Freezed,
      suspended: false,
      maskedCardNumber: card?.maskedCardNumber,
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

  const onOtpCloseBottomSheet = (): void => {
    otpVerificationRef?.current?.resetInterval();
    setOtpSheetVisible(false);
  };

  const prepareCardInfoData = (data: any) => {
    const cardExpireDate = data?.expiryDate;
    const cardType = data?.cardTypeDesc;
    const cardNumberValue = data?.cardNumber;
    const cardNumber = [...cardNumberValue]
      .map((d, i) => (i % 4 === 0 ? ` ${d}` : d))
      .join('')
      .trim();

    const cardInfo = {
      ...data,
      expiryDate: cardExpireDate,
      cardNumber,
      cardType,
    };

    setCardDetails(cardInfo);
  };

  const getCardDetails = async () => {
    if (constants.MOCK_API_RESPONSE) {
      otpVerificationRef?.current?.resetInterval();
      setOtpSheetVisible(false);
      prepareCardInfoData(cardsListMock.response.cards[0]);
      setIsCardDetailsSheetVisible(true);
      cardDetailsSheetRef?.current?.present();
      return;
    }
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
    if (apiResponse.status.type === 'SUCCESS') {
      otpVerificationRef?.current?.resetInterval();
      setOtpSheetVisible(false);
      prepareCardInfoData(apiResponse?.response);
      setIsCardDetailsSheetVisible(true);
      cardDetailsSheetRef?.current?.present();
    }
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'), false);
    } else {
      getCardDetails();
    }
  };

  const handleOnPressHelp = (): void => {
    helpCenterRef?.current?.present();
  };

  const onResendCodePress = () => {
    prepareOtpCardDetails(false);
  };

  const onATMLongPress = () => {
    actionSheetRef.current.show();
  };

  useEffect(() => {
    getCardsData();
  }, []);

  const renderCardsCurrentState = () => {
    if (cardsCurrentState === CardScreenCurrentState.NO_DATA) {
      return (
        <IPayView style={styles.noResultContainer}>
          <IPayNoResult
            testID="no-result"
            textColor={colors.primary.primary800}
            message="CARDS.YOU_DO_NOT_HAVE_CARD"
            showEmptyBox
          />
          <IPayButton
            btnStyle={styles.buttonStyle}
            btnText="CARDS.CREATE_NEW_CARD"
            btnType={buttonVariants.PRIMARY}
            large
            onPress={openCardSheet}
            leftIcon={<IPayIcon icon={icons.add} size={20} color={colors.natural.natural0} />}
          />
        </IPayView>
      );
    }

    if (cardsCurrentState === CardScreenCurrentState.HAS_DATA) {
      return (
        <>
          <IPayView style={styles.cardsContainer}>
            <IPayCarousel
              data={[...cardsData, { newCard: true }]}
              modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: scaleSize(100) }}
              mode={CarouselModes.PARALLAX}
              width={SCREEN_WIDTH}
              loop={false}
              height={verticalScale(350)}
              onChangeIndex={onChangeIndex}
              renderItem={({ item }) =>
                (item as { newCard?: boolean }).newCard ? (
                  newCard
                ) : (
                  <IPayATMCard card={item as CardInterface} setBoxHeight={setBoxHeight} onLongPress={onATMLongPress} />
                )
              }
            />
          </IPayView>
          {boxHeight > 0 && currentCard && (
            <IPayCustomSheet gradientHandler={false} boxHeight={HEIGHT} topScale={200}>
              <IPayCardSection
                currentCard={currentCard}
                setCards={setCardsData}
                onOpenOTPSheet={onPinCodeSheet}
                cards={cardsData}
              />
            </IPayCustomSheet>
          )}
        </>
      );
    }

    return <IPayView />;
  };

  return (
    <IPaySafeAreaView testID="ipay-safearea" style={styles.container}>
      <IPayView style={styles.topDetails}>
        <IPayTitle2Text regular={false} text="CARDS.CARDS" />
        <IPayButton
          small
          btnType={buttonVariants.LINK_BUTTON}
          btnText="CARDS.NEW_CARD"
          onPress={openCardSheet}
          rightIcon={<IPayIcon icon={icons.addSquare2} size={20} color={colors.primary.primary500} />}
        />
      </IPayView>
      {renderCardsCurrentState()}
      <IPayPortalBottomSheet
        heading="CARD_OPTIONS.CARD_DETAILS"
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
          otp={otp}
          isBottomSheet={false}
          handleOnPressHelp={handleOnPressHelp}
          timeout={otpConfig.transaction.otpTimeout}
          onResendCodePress={onResendCodePress}
        />
      </IPayPortalBottomSheet>

      <IPayPortalBottomSheet
        isVisible={isCardDetailsSheetVisible}
        ref={cardDetailsSheetRef}
        heading="CARDS.CARD_DETAILS"
        customSnapPoint={isAndroidOS ? ['56%'] : ['51%']}
        onCloseBottomSheet={onCloseCardSheet}
        simpleBar
        cancelBnt
        bold
        headerContainerStyles={styles.sheetHeader}
        bgGradientColors={sheetGradient}
        bottomSheetBgStyles={styles.sheetBackground}
      >
        <IPayCardDetails cardDetails={cardDetails} />
      </IPayPortalBottomSheet>
      <IPayPortalBottomSheet
        heading="CARD_ISSUE.ISSUE_NEW_CARD"
        onCloseBottomSheet={closeCardSheet}
        customSnapPoint={['55%', '60%']}
        ref={cardSheetRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        isVisible={isCardsSheetVisible}
        cancelBnt
      >
        <IPayCardIssueBottomSheet
          handleCardSelection={handleCardSelection}
          selectedCard={selectedCard}
          onNextPress={handleNext}
        />
      </IPayPortalBottomSheet>
      <IPayFreezeConfirmationSheet
        currentCard={currentCard}
        cards={cardsData}
        setCards={setCardsData}
        ref={actionSheetRef}
      />
    </IPaySafeAreaView>
  );
};
export default CardsScreen;
