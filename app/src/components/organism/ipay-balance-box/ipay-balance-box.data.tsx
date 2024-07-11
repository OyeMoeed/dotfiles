import icons from '@app/assets/icons';
import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';

const useCarouselData = () => {
  const localizationText = useLocalization();

  const carouselData = [
    {
      data: [
        {
          text: localizationText.HOME.SEND_MONEY,
          icon: icons.send_money,
          navigate: () => navigate(screenNames.WALLET_TRANSFER),
        },
        { text: localizationText.HOME.REQUEST_MONEY, icon: icons.money_request },
        { text: localizationText.HOME.SEND_GIFT, icon: icons.gift, isNew: true },
        { text: localizationText.HOME.BILL_PAYMENTS, icon: icons.receipt_text },
        { text: localizationText.HOME.INTERNATIONAL_TR, icon: icons.global_1 },
        { text: localizationText.HOME.ATM_WITHDRAWALS, icon: icons.card },
      ],
    },
    {
      data: [
        {
          text: localizationText.HOME.LOCAL_TRANSFER,
          icon: <IpayFlagIcon country="ar" />,
          transfer_type: localizationText.HOME.LOCAL_TRANSFER,
        },
        { text: localizationText.HOME.QR_ACCEPTANCE, icon: icons.scanner, isNew: true },
        { text: localizationText.HOME.SPENDING_LIMIT, icon: icons.calculator },
        { text: localizationText.HOME.MY_ACCOUNT, icon: icons.user_tag },
      ],
    },
  ];

  return carouselData;
};

export default useCarouselData;
