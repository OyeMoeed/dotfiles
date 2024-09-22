import icons from '@app/assets/icons';
import useConstantData from '@app/constants/use-constants';
import colors from '@app/styles/colors.const';
import { formatDate } from '@app/utilities/date-helper.util';
import { PayChannel } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const useData = () => {
  const { t } = useTranslation();
  const {
    applePayDetails,
    // cardPayDetails,
    walletPayDetailes,
    orderDetails,
    sendMoneyDetails,
    requestAccepted,
    requestMoneySuccess,
    giftPayDetailes,
  } = useConstantData();

  const route = useRoute();
  const { topupChannel } = route.params;

  const cardTopUpDetails = route?.params?.summaryData?.response;
  const cardPayDetails = [
    {
      id: '1',
      label: t('TOP_UP.CARDS_TOPUP_TRX_TYPE'),
      value: t('TOP_UP.CARDS_TOPUP_TRX_TYPE_VALUE'),
      icon: icons.cards,
      color: colors.primary.primary800,
    },
    {
      id: '3',
      label: t('TOP_UP.REF_NUMBER'),
      value: cardTopUpDetails?.transactionId,
      icon: icons.copy,
      color: colors.primary.primary500,
    },
    {
      id: '4',
      label: t('TOP_UP.TOPUP_DATE'),
      value: formatDate(cardTopUpDetails?.transactionTime),
      icon: null,
    },
  ];

  const getDetails = () => {
    switch (topupChannel) {
      case PayChannel.GIFT:
        return giftPayDetailes;
      case PayChannel.ORDER:
        return orderDetails;
      case PayChannel.MONEY:
        return sendMoneyDetails;
      case PayChannel.APPLE:
        return applePayDetails;
      case PayChannel.REQUEST_ACCEPT:
        return requestAccepted;
      case PayChannel.CARD:
        return cardPayDetails;
      case PayChannel.WALLET:
        return walletPayDetailes;
      case PayChannel.REQUEST:
        return requestMoneySuccess;
      default:
        return null; // Or any default value you'd like to return if no cases match
    }
  };

  const renderText = () => {
    switch (topupChannel) {
      case PayChannel.GIFT:
        return 'TOP_UP.GIFT_SUCCESSFUL';

      case PayChannel.WALLET:
        return 'TOP_UP.TRANSFER_SUCCESSFUL';

      case PayChannel.MONEY:
        return 'TOP_UP.TRANSFER_SUCCESSFUL';

      case PayChannel.REQUEST:
        return 'REQUEST_SUMMARY.REQUEST_SENT';
      case PayChannel.REQUEST_ACCEPT:
        return 'REQUEST_MONEY.REQUEST_PAID';
      case PayChannel.ORDER:
        return 'ORDER_SCREEN.TITLE';
      default:
        return 'TOP_UP.TOPUP_SUCCESS';
    }
  };
  return {
    getDetails,
    renderText,
  };
};

export default useData;
