import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayHeadlineText, IPayIcon, IPayView, IPayWebView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, PayChannel, spinnerVariant, TopupStatus } from '@app/utilities/enums.util';
import React, { useCallback, useState } from 'react';
import cardVerificationStyles from './cardVerification.styles';
import { useRoute } from '@react-navigation/core';
import { WebViewNavigation } from 'react-native-webview';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { CheckStatusProp } from '@app/network/services/core/topup-cards/topup-cards.interface';
import { useTypedSelector } from '@app/store/store';
import { topupCheckStatus } from '@app/network/services/core/topup-cards/topup-cards.service';

const CardVerificationScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const [cvv, setCvv] = useState('');
  const [isCvvError, setIsCvvError] = useState(false); // State to manage CVV error
  const styles = cardVerificationStyles(colors);

  const route: any = useRoute();
  const { redirectUrl, transactionRefNumber } = route.params;
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const [apiError, setAPIError] = useState<string>('');
  // const [trials, setTrials] = useState<number>(0);
  const [showWebView, setShowWebView] = useState<boolean>(true);
  let trial = 0;

  // const handlePressPay = () => {
  //   setProcessToast(false);
  //   if (channel === PayChannel.APPLE) {
  //     setTopUpAmount('');
  //     navigate(screenNames.TOP_UP_SUCCESS, { topupChannel: PayChannel.APPLE, topupStatus: TopupStatus.SUCCESS });
  //   } else {
  //     navigate(screenNames.CARD_VERIFICATION);
  //   }
  // };

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

  const handleCvvChange = (text: string) => {
    setCvv(text);
  };

  const onPressConfirm = () => {
    if (cvv === constants.MOCK_CVV) {
      setIsCvvError(false);
      setCvv('');
      navigate(screenNames.TOP_UP_SUCCESS, { topupChannel: PayChannel.CARD, topupStatus: TopupStatus.SUCCESS });
    } else {
      setIsCvvError(true);
    }
  };

  const checkStatus = async () => {
    renderSpinner(true);

    const payload: CheckStatusProp = {
      walletNumber,
      refNumber: transactionRefNumber,
    };

    // console.log(payload);

    const apiResponse: any = await topupCheckStatus(payload);

    if (apiResponse.response.pmtResultCd == 'P') {
      if (trial < 3) {
        trial = trial + 1;
        setTimeout(function () {
          checkStatus();
        }, 3000);
      } else {
        renderSpinner(false);
        navigate(screenNames.TOP_UP_SUCCESS, {
          topupChannel: PayChannel.CARD,
          topupStatus: TopupStatus.SUCCESS,
          isUnderProccess: true,
          summaryData: apiResponse,
        });
      }
    } else {
      if (apiResponse?.status?.type == ApiResponseStatusType.SUCCESS) {
        renderSpinner(false);
        navigate(screenNames.TOP_UP_SUCCESS, {
          topupChannel: PayChannel.CARD,
          topupStatus: TopupStatus.SUCCESS,
          summaryData: apiResponse,
        });
      } else {
        renderSpinner(false);
        setAPIError(apiResponse?.error || setAPIError(localizationText.ERROR.API_ERROR_RESPONSE));
      }
    }
  };

  const onNavigationStateChange = (event: WebViewNavigation) => {
    if (event?.url?.indexOf('result') != -1) {
      setShowWebView(false);
      renderSpinner(true);
      checkStatus();
      return;
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.TOP_UP.VERIFICATION_TITLE} applyFlex />
      <IPayView style={styles.container}>
        {redirectUrl && showWebView && (
          <IPayWebView source={{ uri: redirectUrl }} onNavigationStateChange={onNavigationStateChange} />
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default CardVerificationScreen;
