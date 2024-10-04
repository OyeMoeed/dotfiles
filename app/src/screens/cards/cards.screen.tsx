import icons from '@app/assets/icons';
import { IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayCardIssueBottomSheet, IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import IPayCardDetails from '@app/components/templates/ipay-card-details/ipay-card-details.component';
import IPayCardsCarousel from '@app/components/templates/ipay-cards-carousel/ipay-cards-carousel.component';
import IPayFreezeConfirmationSheet from '@app/components/templates/ipay-freeze-confirmation-sheet/ipay-freeze-confirmation-sheet.component';
import constants, { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import cardsListMock from '@app/network/services/core/transaction/cards-list.mock';
import {
  CardsProp,
  getCardDetailsProp,
  prepareShowDetailsProp,
} from '@app/network/services/core/transaction/transaction.interface';
import {
  otpGetCardDetails,
  prepareShowCardDetails,
  useGetCards,
} from '@app/network/services/core/transaction/transactions.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities';
import { setCards, setCurrentCard, triggerScrollToFirst } from '@app/store/slices/cards-slice';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { filterCards, mapCardData } from '@app/utilities/cards.utils';
import checkUserAccess from '@app/utilities/check-user-access';
import { isAndroidOS } from '@app/utilities/constants';
import { buttonVariants, CardOptions } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import CardScreenCurrentState from './cards.screen.interface';
import cardScreenStyles from './cards.style';

const CardsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = cardScreenStyles(colors);
  const cardDetailsSheetRef = useRef<any>(null);
  const cardSheetRef = useRef<any>(null);
  const actionSheetRef = useRef<any>(null);

  const dispatch = useDispatch();
  const { cards: cardsData, currentCard } = useTypedSelector((state) => state.cardsReducer);

  const [boxHeight, setBoxHeight] = useState<number>(0);

  const sheetGradient = [colors.primary.primary10, colors.primary.primary10];
  const [selectedCard, setSelectedCard] = useState<CardOptions | ''>('');

  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);
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
      setSelectedCard('');
      cardSheetRef.current.present();
    }
  };
  const closeCardSheet = () => {
    setIsCardSheetVisible(false);
  };
  const handleNext = () => {
    setIsCardSheetVisible(false);
    setSelectedCard('');
    if (selectedCard === CardOptions.VIRTUAL) {
      navigate(screenNames.VIRTUAL_CARD);
    } else {
      navigate(screenNames.PHYSICAL_CARD_MAIN);
    }
  };

  const handleCardSelection = (cardType: CardOptions) => {
    setSelectedCard(cardType);
  };

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
    dispatch(setCurrentCard(cardsData[index]));
  };

  const getCardPayload: CardsProp = {
    walletNumber,
    hideSpinner: true,
  };

  const getCardsData = async (cardApiResponse: any) => {
    if (cardApiResponse) {
      const availableCards = filterCards(cardApiResponse?.response?.cards);

      if (availableCards?.length) {
        dispatch(setCards(mapCardData(availableCards)));
        dispatch(setCurrentCard(mapCardData(availableCards)[0]));
        dispatch(triggerScrollToFirst());
        setCardsCurrentState(CardScreenCurrentState.HAS_DATA);
      } else {
        setCardsCurrentState(CardScreenCurrentState.NO_DATA);
      }
    }
  };

  const { isLoading: isLoadingCards } = useGetCards({
    payload: getCardPayload,
    onSuccess: getCardsData,
  });

  const onOtpCloseBottomSheet = (): void => {
    otpVerificationRef?.current?.resetInterval();
    setOtpSheetVisible(false);
    setOtp('');
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
      prepareCardInfoData(cardsListMock?.response?.cards[0]);
      setIsCardDetailsSheetVisible(true);
      cardDetailsSheetRef?.current?.present();
      return;
    }
    const cardDetailsPayload: getCardDetailsProp = {
      walletNumber,
      body: {
        cardIndex: currentCard?.cardIndex,
        otp,
        otpRef,
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      },
    };
    const apiResponse: any = await otpGetCardDetails(cardDetailsPayload);
    if (apiResponse.status.type === 'SUCCESS') {
      otpVerificationRef?.current?.resetInterval();
      setOtpSheetVisible(false);
      prepareCardInfoData(apiResponse?.response);
      setIsCardDetailsSheetVisible(true);
      cardDetailsSheetRef?.current?.present();
      setOtp('');
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
    if (cardsData.length) {
      setCardsCurrentState(CardScreenCurrentState.HAS_DATA);
      dispatch(setCurrentCard(cardsData[0]));
      dispatch(triggerScrollToFirst());
    } else {
      setCardsCurrentState(CardScreenCurrentState.NO_DATA);
      dispatch(setCurrentCard(undefined));
    }
  }, [cardsData]);

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
      <IPayCardsCarousel
        cardsCurrentState={cardsCurrentState}
        cardsData={cardsData}
        styles={styles}
        onChangeIndex={onChangeIndex}
        openCardSheet={openCardSheet}
        setBoxHeight={setBoxHeight}
        onATMLongPress={onATMLongPress}
        boxHeight={boxHeight}
        onPinCodeSheet={onPinCodeSheet}
        isLoadingCards={isLoadingCards}
      />
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
      {currentCard ? <IPayFreezeConfirmationSheet ref={actionSheetRef} /> : <View />}
    </IPaySafeAreaView>
  );
};
export default CardsScreen;
