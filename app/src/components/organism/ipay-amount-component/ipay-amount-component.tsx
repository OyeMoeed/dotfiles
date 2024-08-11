import icons from '@app/assets/icons';
import { IPayAmountHeader, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { IPayAddCardBottomsheet } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, payChannel, spinnerVariant, TopUpStates, TopupStatus } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useState } from 'react';
import IPayRemainingAccountBalance from '../ipay-remaining-account-balance/ipay-remaining-account-balance.component';
import IPayAmountProps from './ipay-amount-component.interface';
import amountStyles from './ipay-amount-component.styles';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { topupCheckout } from '@app/network/services/core/topup-cards/topup-cards.service';
import { CheckOutProp } from '@app/network/services/core/topup-cards/topup-cards.interface';
import { useTypedSelector } from '@app/store/store';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';

const IPayAmount: React.FC<IPayAmountProps> = ({
  channel,
  onPressAddCards,
  openPressExpired,
  walletInfo,
  handleCardSelect,
  openExpirationBottomSheet,
  openExpiredDateBottomSheet,
  openCvvBottomSheet,
  selectedDate,
}) => {
  const { colors } = useTheme();
  const [currentState, setCurrentState] = useState(TopUpStates.INITAL_STATE);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isTopUpNextEnable, setIsTopUpNextEnable] = useState(true);
  const [isCardSaved, setIsCardSaved] = useState(true);
  const [chipValue, setChipValue] = useState('');
  const [processToast, setProcessToast] = useState(false);
  const localizationText = useLocalization();
  const styles = amountStyles(colors);
  const [selectedCardObj, setSelectedCardObj] = useState<any>({});
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const [apiError, setAPIError] = useState<string>('');
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const { showSpinner, hideSpinner } = useSpinnerContext();

  // const handlePressPay = () => {
  //   setProcessToast(false);
  //   if (channel === payChannel.APPLE) {
  //     setTopUpAmount('');
  //     navigate(screenNames.TOP_UP_SUCCESS, { topupChannel: payChannel.APPLE, topupStatus: TopupStatus.SUCCESS });
  //   } else {
  //     navigate(screenNames.CARD_VERIFICATION);
  //   }
  // };

  const addCard = ()=>{
    handlePressPay();
  }

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
  

  const handlePressPay = async () => {
    renderSpinner(true);

    const deviceInfo = await getDeviceInfo();
    const body: any = {
      amount: topUpAmount,
      deviceInfo: deviceInfo,
      paymentDescription: 'nothing',
    };
    if (selectedCardObj.registrationId) {
      body.cardRegistrationId = selectedCardObj.registrationId;
    }
    if (selectedCardObj?.cardBrand) {
      body.cardBrand = selectedCardObj?.cardBrand?.toLocaleLowerCase();
    } else {
      body.cardBrand = 'mada';
    }

    const payload: CheckOutProp = {
      walletNumber,
      checkOutBody: body
    }


    const apiResponse: any = await topupCheckout(payload);

    switch (apiResponse?.status?.type) {
      case ApiResponseStatusType.SUCCESS:
          let paymentGateway = apiResponse?.response?.paymentGateway;
          setRedirectUrl(apiResponse?.response?.redirectUrl);
          if (paymentGateway == 'CLICKPAY') {
            navigate(screenNames.CARD_VERIFICATION, { 
              redirectUrl: apiResponse?.response?.redirectUrl,
              transactionRefNumber: apiResponse?.response?.transactionRefNumber,
              paymentGateway
            });

          } else {
            navigate(screenNames.CARD_VERIFICATION, { 
              redirectUrl: apiResponse?.response?.redirectUrl,
              paymentGateway
            });
          }
        break;
      case apiResponse?.apiResponseNotOk:
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
        break;
      case ApiResponseStatusType.FAILURE:
        setAPIError(apiResponse?.error);
        break;
      default:
         break;


    }

    renderSpinner(false);
  };

  const limitsDetails = walletInfo.limitsDetails;
  useEffect(() => {
    const monthlyRemaining = parseFloat(limitsDetails.monthlyRemainingOutgoingAmount);
    const dailyRemaining = parseFloat(limitsDetails.dailyRemainingOutgoingAmount);
    const updatedTopUpAmount = parseFloat(topUpAmount.replace(/,/g, ''));

    if (monthlyRemaining === 0) {
      setIsTopUpNextEnable(false);
      setChipValue(localizationText.TOP_UP.LIMIT_REACHED);
    } else if (updatedTopUpAmount > dailyRemaining && updatedTopUpAmount < monthlyRemaining) {
      setIsTopUpNextEnable(false);
      setChipValue(`${localizationText.TOP_UP.DAILY_LIMIT} ${limitsDetails.dailyOutgoingLimit} SAR`);
    } else if (updatedTopUpAmount > monthlyRemaining) {
      setIsTopUpNextEnable(false);
      setChipValue(localizationText.TOP_UP.AMOUNT_EXCEEDS_CURRENT);
    } else {
      if (topUpAmount == '' || topUpAmount == '0') {
        setIsTopUpNextEnable(false);
      } else {
        setIsTopUpNextEnable(true);
      }
      setChipValue('');
    }
  }, [
    topUpAmount,
    limitsDetails.monthlyRemainingOutgoingAmount,
    limitsDetails.dailyRemainingOutgoingAmount,
    localizationText,
  ]);

  const handleNextPress = () => {
    if (isCardSaved) {
      setCurrentState(TopUpStates.SAVED_CARD);
    } else {
      setCurrentState(TopUpStates.NEW_CARD);
    }
    setIsEditable(false);
  };
  const [isEditable, setIsEditable] = useState(true);
  const handleIconPress = () => {
    // setIsEditable(!isEditable);
    setCurrentState(TopUpStates.INITAL_STATE);
  };
  const handleCardObjSelect = (card: any)=> {
    setSelectedCardObj(card)

  }
  return (
    <IPayView style={styles.safeAreaView}>
      {currentState != TopUpStates.NEW_CARD ? (
        <>
          <IPayAmountHeader title={localizationText.TOP_UP.CARD_TITLE} channel={channel} />
          <IPayRemainingAccountBalance
            currentState={currentState}
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
            chipValue={chipValue}
            walletInfo={walletInfo}
            payChannelType={payChannel.CARD}
            openPressExpired={openPressExpired}
            onPressAddCards={addCard}
            handleCardSelect={handleCardObjSelect}
            showIcon={currentState !== TopUpStates.INITAL_STATE}
            isEditable={currentState === TopUpStates.INITAL_STATE}
            onPressIcon={handleIconPress}
          />

          {channel === payChannel.APPLE ? (
            <IPayButton
              large
              btnStyle={[
                styles.payButton,
                { backgroundColor: isTopUpNextEnable ? colors.natural.natural1000 : colors.natural.natural300 },
              ]}
              btnType="primary"
              leftIcon={<IPayIcon icon={icons.apple_pay} size={48} color={colors.natural.natural0} />}
              onPress={handlePressPay}
              disabled={!isTopUpNextEnable}
            />
          ) : (
            <IPayButton
              large
              btnType="primary"
              btnIconsDisabled
              btnText={
                currentState === TopUpStates.SAVED_CARD ? localizationText.TOP_UP.PAY : localizationText.COMMON.NEXT
              }
              onPress={currentState === TopUpStates.SAVED_CARD ? handlePressPay : handleNextPress}
              disabled={!isTopUpNextEnable}
            />
          )}
        </>
      ) : (
        <IPayAddCardBottomsheet
          containerStyles={styles.outerCOntainerStyles}
          closeBottomSheet={() => {
            setIsCardSaved(true);
            handlePressPay();
          }}
          expiryOnPress={openExpirationBottomSheet}
          openExpiredDateBottomSheet={openExpiredDateBottomSheet}
          cvvPress={openCvvBottomSheet}
          selectedDate={selectedDate}
          savedScreen
        />
      )}
    </IPayView>
  );
};

export default IPayAmount;