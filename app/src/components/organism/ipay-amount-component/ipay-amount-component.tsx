import icons from '@app/assets/icons';
import { IPayAmountHeader, IPayIcon, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayButton } from '@app/components/molecules';
import { IPayAddCardBottomsheet } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { ApplePayCheckOutReq } from '@app/network/services/cards-management/apple-pay-add-balance/apple-pay-checkout/apple-pay-check-out.interface';
import applePayCheckout from '@app/network/services/cards-management/apple-pay-add-balance/apple-pay-checkout/apple-pay-checkout.service';
import { CheckOutProp } from '@app/network/services/core/topup-cards/topup-cards.interface';
import { topupCheckout } from '@app/network/services/core/topup-cards/topup-cards.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import {
  ApiResponseStatusType,
  TopUpStates,
  TopupStatus,
  buttonVariants,
  PayChannel,
  spinnerVariant,
} from '@app/utilities/enums.util';

// TODO: fix no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { getErrorMessage } from '@rnw-community/shared';

import { IosPaymentResponse, PaymentComplete, PaymentRequest } from '@rnw-community/react-native-payments';
import { PaymentMethodNameEnum, SupportedNetworkEnum } from '@rnw-community/react-native-payments/src';
import React, { useCallback, useEffect, useState } from 'react';
import IPayRemainingAccountBalance from '../ipay-remaining-account-balance/ipay-remaining-account-balance.component';
import IPayAmountProps from './ipay-amount-component.interface';
import amountStyles from './ipay-amount-component.styles';

const IPayAmount: React.FC<IPayAmountProps> = ({
  channel,
  openPressExpired,
  walletInfo,
  openExpirationBottomSheet,
  openExpiredDateBottomSheet,
  openCvvBottomSheet,
  selectedDate,
}) => {
  const { colors } = useTheme();
  const [currentState, setCurrentState] = useState(TopUpStates.INITAL_STATE);
  const [topUpAmount, setTopUpAmount] = useState('');
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [isTopUpNextEnable, setIsTopUpNextEnable] = useState(true);
  const [isCardSaved, setIsCardSaved] = useState(true);
  const [chipValue, setChipValue] = useState('');
  const localizationText = useLocalization();
  const styles = amountStyles(colors);
  const [, setError] = useState('');
  const [, setResponse] = useState<object>();

  const [selectedCardObj, setSelectedCardObj] = useState<any>({});
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [, setAPIError] = useState<string>('');
  const [, setRedirectUrl] = useState<string>('');
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const methodData: PaymentMethodData[] = [
    {
      supportedMethods: PaymentMethodNameEnum.ApplePay,
      data: {
        merchantIdentifier: 'merchant.com.clickpay',
        supportedNetworks: [SupportedNetworkEnum.Visa, SupportedNetworkEnum.Mada, SupportedNetworkEnum.Mastercard],
        countryCode: 'SA',
        currencyCode: localizationText.COMMON.SAR,
      },
    },
  ];

  const paymentDetails: PaymentDetailsInit = {
    total: {
      amount: {
        currency: localizationText.COMMON.SAR,
        value: topUpAmount,
      },
      label: localizationText.TRANSACTION_HISTORY.TOTAL_AMOUNT,
    },
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

  const createPaymentRequest = (): PaymentRequest => {
    setError('');
    setResponse(undefined);
    return new PaymentRequest(methodData, paymentDetails);
  };

  const applePayCheckOutId = async (paymentResponse: IosPaymentResponse): Promise<void> => {
    showSpinner({
      variant: spinnerVariant.DEFAULT,
      hasBackgroundColor: true,
    });

    const applePayCheckOutPayload: ApplePayCheckOutReq = {
      clickPayApplePayToken: {
        transactionIdentifier: paymentResponse.details.applePayToken.transactionIdentifier,
        paymentData: paymentResponse.details.applePayToken.paymentData.data,
        paymentMethod: {
          network: paymentResponse.details.applePayToken.paymentMethod.network,
          type: paymentResponse.details.applePayToken.paymentMethod.type,
          displayName: paymentResponse.details.applePayToken.paymentMethod.displayName,
        },
      },
      amount: topUpAmount,
      cardBrand: 'visa', // will be discussed with business to verify !
      deviceInfo: appData?.deviceInfo!,
    };

    const appleCheckoutResponse = await applePayCheckout(walletInfo.walletNumber, applePayCheckOutPayload);
    if (appleCheckoutResponse?.status?.type === 'SUCCESS') {
      hideSpinner();
      renderSpinner(false);

      navigate(screenNames.TOP_UP, {
        topupChannel: PayChannel.APPLE,
        topupStatus: TopupStatus.SUCCESS,
        amount: topUpAmount,
      });
    }

    hideSpinner();
    renderSpinner(false);
  };

  const handlePay = (): void => {
    createPaymentRequest()
      .show()
      .then((paymentResponse) => {
        applePayCheckOutId(paymentResponse);

        setResponse(paymentResponse.details);

        return paymentResponse.complete(PaymentComplete.SUCCESS);
      })
      .catch((err: unknown) => setError(getErrorMessage(err)));
  };

  const handlePressPay = async () => {
    renderSpinner(true);
    if (channel === PayChannel.APPLE) {
      try {
        handlePay();
        return;
      } catch (error) {
        return;
      } finally {
        renderSpinner(false);
      }
    }
    const deviceInfo = await getDeviceInfo();
    const body: any = {
      amount: topUpAmount,
      deviceInfo,
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
      checkOutBody: body,
    };

    const apiResponse: any = await topupCheckout(payload);

    switch (apiResponse?.status?.type) {
      case ApiResponseStatusType.SUCCESS: {
        const paymentGateway = apiResponse?.response?.paymentGateway;

        setRedirectUrl(apiResponse?.response?.redirectUrl);
        if (paymentGateway === 'CLICKPAY') {
          navigate(screenNames.CARD_VERIFICATION, {
            redirectUrl: apiResponse?.response?.redirectUrl,
            transactionRefNumber: apiResponse?.response?.transactionRefNumber,
            paymentGateway,
          });
        } else {
          navigate(screenNames.CARD_VERIFICATION, {
            redirectUrl: apiResponse?.response?.redirectUrl,
            paymentGateway,
          });
        }
        break;
      }
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

  const addCard = () => {
    handlePressPay();
  };

  const { limitsDetails } = walletInfo;
  useEffect(() => {
    const monthlyRemaining = parseFloat(limitsDetails.monthlyRemainingIncomingAmount);
    const dailyRemaining = parseFloat(limitsDetails.dailyRemainingIncomingAmount);
    const updatedTopUpAmount = parseFloat(topUpAmount.replace(/,/g, ''));

    if (monthlyRemaining === 0) {
      setIsTopUpNextEnable(false);
      setChipValue(localizationText.TOP_UP.LIMIT_REACHED);
    } else if (updatedTopUpAmount > dailyRemaining) {
      setIsTopUpNextEnable(false);
      setChipValue(`${localizationText.TOP_UP.DAILY_LIMIT} ${limitsDetails.dailyRemainingIncomingAmount} SAR`);
    } else if (updatedTopUpAmount > monthlyRemaining) {
      setIsTopUpNextEnable(false);
      setChipValue(localizationText.TOP_UP.AMOUNT_EXCEEDS_CURRENT);
    } else {
      if (topUpAmount === '' || topUpAmount === '0') {
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
    // setIsEditable(false);
  };
  const handleIconPress = () => {
    // setIsEditable(!isEditable);
    setCurrentState(TopUpStates.INITAL_STATE);
  };
  const handleCardObjSelect = (card: any) => {
    setSelectedCardObj(card);
  };
  return (
    <IPayView style={styles.safeAreaView}>
      {currentState !== TopUpStates.NEW_CARD ? (
        <>
          <IPayAmountHeader title={localizationText.TOP_UP.CARD_TITLE} channel={channel} />
          <IPayRemainingAccountBalance
            currentState={currentState}
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
            chipValue={chipValue}
            walletInfo={walletInfo}
            PayChannelType={PayChannel.CARD}
            openPressExpired={openPressExpired}
            onPressAddCards={addCard}
            handleCardSelect={handleCardObjSelect}
            showIcon={currentState !== TopUpStates.INITAL_STATE}
            isEditable={currentState === TopUpStates.INITAL_STATE}
            onPressIcon={handleIconPress}
            balanceType="Incoming"
          />

          {channel === PayChannel.APPLE ? (
            <IPayButton
              large
              btnStyle={[
                styles.payButton,
                { backgroundColor: isTopUpNextEnable ? colors.natural.natural1000 : colors.natural.natural300 },
              ]}
              btnType={buttonVariants.PRIMARY}
              leftIcon={<IPayIcon icon={icons.apple_pay} size={48} color={colors.natural.natural0} />}
              onPress={handlePressPay}
              disabled={!isTopUpNextEnable}
            />
          ) : (
            <IPayButton
              large
              btnType={buttonVariants.PRIMARY}
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
