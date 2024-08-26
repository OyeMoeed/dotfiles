import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { payChannel } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/native';

const useData = () => {
  const localizationText = useLocalization();
  const { applePayDetails, cardPayDetails, walletPayDetailes, orderDetails } = useConstantData();
  const route = useRoute();
  const { topupChannel } = route.params;

  const getDetails = () => {
    switch (topupChannel) {
      case payChannel.ORDER:
        return orderDetails;

      case payChannel.APPLE:
        return applePayDetails;

      case payChannel.CARD:
        return cardPayDetails;

      case payChannel.WALLET:
        return walletPayDetailes;

      default:
        return null; // Or any default value you'd like to return if no cases match
    }
  };

  const renderText = () => {
    switch (topupChannel) {
      case payChannel.GIFT:
        return localizationText.TOP_UP.GIFT_SUCCESSFUL;

      case payChannel.WALLET:
        return localizationText.TOP_UP.TRANSFER_SUCCESSFUL;

      case payChannel.MONEY:
        return localizationText.TOP_UP.TRANSFER_SUCCESSFUL;

      case payChannel.REQUEST:
        return localizationText.REQUEST_SUMMARY.REQUEST_SENT;
      case payChannel.REQUEST_ACCEPT:
        return localizationText.REQUEST_MONEY.REQUEST_PAID;
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
