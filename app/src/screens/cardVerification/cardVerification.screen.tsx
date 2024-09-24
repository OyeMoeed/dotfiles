import { IPayView, IPayWebView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import { goBack, navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { PayChannel, TopupStatus } from '@app/utilities/enums.util';

import icons from '@app/assets/icons';
import { CheckStatusProp } from '@app/network/services/core/topup-cards/topup-cards.interface';
import { topupCheckStatus } from '@app/network/services/core/topup-cards/topup-cards.service';
import { useTypedSelector } from '@app/store/store';
import { dateTimeFormat } from '@app/utilities';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { WebViewNavigation } from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import cardVerificationStyles from './cardVerification.styles';

const CardVerificationScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = cardVerificationStyles(colors);

  const route: any = useRoute();
  const { redirectUrl, transactionRefNumber } = route.params;
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
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

  const checkStatus = async () => {
    const payload: CheckStatusProp = {
      walletNumber,
      refNumber: transactionRefNumber,
    };

    const apiResponse: any = await topupCheckStatus(payload);
    const details = [
      {
        id: '1',
        label: t('TOP_UP.TOPUP_TYPE'),
        value: t('TOP_UP.CREDIT_CARD'),
        icon: icons.cards,
        color: colors.primary.primary800,
      },
      {
        id: '2',
        label: t('TOP_UP.REF_NUMBER'),
        value: apiResponse?.response?.transactionId,
        icon: icons.copy,
        color: colors.primary.primary500,
      },
      {
        id: '3',
        label: t('TOP_UP.TOPUP_DATE'),
        value: formatDateAndTime(apiResponse?.response?.transactionTime, dateTimeFormat.DateAndTime),
        icon: null,
      },
    ];
    if (apiResponse?.response?.pmtResultCd === 'P') {
      if (trial < 3) {
        trial += 1;
        setTimeout(() => {
          checkStatus();
        }, 3000);
      } else if (apiResponse?.response?.pmtResultCd === 'A') {
        navigate(screenNames.TOP_UP_SUCCESS, {
          topupChannel: PayChannel.CARD,
          topupStatus: TopupStatus.SUCCESS,
          isUnderProccess: true,
          summaryData: apiResponse,
          details,
        });
      } else {
        goBack();
      }
    } else if (apiResponse?.response?.pmtResultCd === 'A') {
      navigate(screenNames.TOP_UP_SUCCESS, {
        topupChannel: PayChannel.CARD,
        topupStatus: TopupStatus.SUCCESS,
        summaryData: apiResponse,
        details,
      });
    } else {
      goBack();
    }
  };

  const onNavigationStateChange = (event: WebViewNavigation) => {
    if (event?.url?.indexOf('result') !== -1) {
      setShowWebView(false);
      checkStatus();
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title="TOP_UP.VERIFICATION_TITLE" applyFlex />
      <IPayView style={styles.container}>
        {redirectUrl && showWebView && (
          <IPayWebView source={{ uri: redirectUrl }} onNavigationStateChange={onNavigationStateChange} />
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default CardVerificationScreen;
