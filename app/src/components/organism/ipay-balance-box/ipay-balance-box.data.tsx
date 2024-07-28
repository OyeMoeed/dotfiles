import icons from '@app/assets/icons';
import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { dashboardOptions } from '@app/utilities/enums.util';

const useCarouselData = () => {
  const localizationText = useLocalization();

  const carouselData = [
    {
      data: [
        {
          text: localizationText.HOME.SEND_MONEY,
          icon: icons.send_money,
          navigate: dashboardOptions.SEND_MONEY,
        },
        { text: localizationText.HOME.REQUEST_MONEY, icon: icons.money_request },
        {
          text: localizationText.HOME.SEND_GIFT,
          icon: icons.gift,
          isNew: true,
        },
        { text: localizationText.HOME.BILL_PAYMENTS, icon: icons.receipt_text },
        { text: localizationText.HOME.INTERNATIONAL_TR, icon: icons.global_1 },
        { text: localizationText.HOME.ATM_WITHDRAWALS, icon: icons.card, navigate: dashboardOptions.ATM_WITHDRAWALS },
      ],
    },
    {
      data: [
        {
          text: localizationText.HOME.LOCAL_TRANSFER,
          icon: <IpayFlagIcon country="ar" />,
          transfer_type: localizationText.HOME.LOCAL_TRANSFER,
          navigate: dashboardOptions.LOCAL_TRANSFER,
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
