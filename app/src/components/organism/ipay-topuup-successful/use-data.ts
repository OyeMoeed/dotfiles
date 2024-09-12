import useConstantData from '@app/constants/use-constants';
import { PayChannel } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const useData = () => {
  const { t } = useTranslation();
  const {
    applePayDetails,
    cardPayDetails,
    walletPayDetailes,
    orderDetails,
    sendMoneyDetails,
    requestAccepted,
    requestMoneySuccess,
    giftPayDetailes,
  } = useConstantData();
  const route = useRoute();
  const { topupChannel } = route.params;

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
        return t('TOP_UP.GIFT_SUCCESSFUL');

      case PayChannel.WALLET:
        return t('TOP_UP.TRANSFER_SUCCESSFUL');

      case PayChannel.MONEY:
        return t('TOP_UP.TRANSFER_SUCCESSFUL');

      case PayChannel.REQUEST:
        return t('REQUEST_SUMMARY.REQUEST_SENT');
      case PayChannel.REQUEST_ACCEPT:
        return t('REQUEST_MONEY.REQUEST_PAID');
      case PayChannel.ORDER:
        return t('ORDER_SCREEN.TITLE');
      default:
        return t('TOP_UP.TOPUP_SUCCESS');
    }
  };
  return {
    getDetails,
    renderText,
  };
};

export default useData;
