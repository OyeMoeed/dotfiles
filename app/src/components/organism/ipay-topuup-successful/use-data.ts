import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { PayChannel } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/native';

const useData = () => {
  const localizationText = useLocalization();
  const {
    applePayDetails,
    walletPayDetailes,
    orderDetails,
    sendMoneyDetails,
    requestAccepted,
    requestMoneySuccess,
    giftPayDetailes,
  } = useConstantData();
  const route = useRoute();
  const { topupChannel, details } = route.params;

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
        return details;
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
        return localizationText.TOP_UP.GIFT_SUCCESSFUL;

      case PayChannel.WALLET:
        return localizationText.TOP_UP.TRANSFER_SUCCESSFUL;

      case PayChannel.MONEY:
        return localizationText.TOP_UP.TRANSFER_SUCCESSFUL;

      case PayChannel.REQUEST:
        return localizationText.REQUEST_SUMMARY.REQUEST_SENT;
      case PayChannel.REQUEST_ACCEPT:
        return localizationText.REQUEST_MONEY.REQUEST_PAID;
      case PayChannel.ORDER:
        return localizationText.ORDER_SCREEN.TITLE;
      default:
        return localizationText.TOP_UP.TOPUP_SUCCESS;
    }
  };
  return {
    getDetails,
    renderText,
  };
};

export default useData;
