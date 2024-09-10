import { IPayView, IPayWebView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { CheckStatusProp } from '@app/network/services/core/topup-cards/topup-cards.interface';
import { topupCheckStatus } from '@app/network/services/core/topup-cards/topup-cards.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { TopupStatus, payChannel } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { WebViewNavigation } from 'react-native-webview';
import cardVerificationStyles from './cardVerification.styles';

const CardVerificationScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const [cvv, setCvv] = useState('');
  const [isCvvError, setIsCvvError] = useState(false); // State to manage CVV error
  const styles = cardVerificationStyles(colors);

  const route: any = useRoute();
  const { redirectUrl, transactionRefNumber } = route.params;
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [showWebView, setShowWebView] = useState<boolean>(true);
  let trial = 0;

  const handleCvvChange = (text: string) => {
    setCvv(text);
  };

  const onPressConfirm = () => {
    if (cvv === constants.MOCK_CVV) {
      setIsCvvError(false);
      setCvv('');
      navigate(screenNames.TOP_UP_SUCCESS, { topupChannel: payChannel.CARD, topupStatus: TopupStatus.SUCCESS });
    } else {
      setIsCvvError(true);
    }
  };

  const checkStatus = async () => {
    const payload: CheckStatusProp = {
      walletNumber,
      refNumber: transactionRefNumber,
    };

    const apiResponse: any = await topupCheckStatus(payload);

    if (apiResponse?.response?.pmtResultCd === 'P') {
      if (trial < 3) {
        trial += 1;
        setTimeout(() => {
          checkStatus();
        }, 3000);
      } else {
        navigate(screenNames.TOP_UP_SUCCESS, {
          topupChannel: payChannel.CARD,
          topupStatus: TopupStatus.SUCCESS,
          isUnderProccess: true,
          summaryData: apiResponse,
        });
      }
    } else if (apiResponse) {
      navigate(screenNames.TOP_UP_SUCCESS, {
        topupChannel: payChannel.CARD,
        topupStatus: TopupStatus.SUCCESS,
        summaryData: apiResponse,
      });
    }
  };

  const onNavigationStateChange = (event: WebViewNavigation) => {
    if (event?.url?.indexOf('result') != -1) {
      setShowWebView(false);
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
