import icons from '@app/assets/icons';
import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { DashboardOptions } from '@app/utilities';

const useCarouselData = () => {
  const localizationText = useLocalization();

  const carouselData = [
    {
      data: [
        {
          text: localizationText.HOME.SEND_MONEY,
          icon: icons.send_money,
          navigate: DashboardOptions.SEND_MONEY,
        },
        {
          text: localizationText.HOME.REQUEST_MONEY,
          icon: icons.money_request,
          navigate: DashboardOptions.REQUEST_MONEY,
        },
        {
          text: localizationText.HOME.SEND_GIFT_HEADING,
          icon: icons.gift,
          isNew: true,
          navigate: DashboardOptions.SEND_GIFT,
        },
        {
          text: localizationText.HOME.BILL_PAYMENTS,
          icon: icons.receipt_item,
          navigate: DashboardOptions.BILL_PAYMENTS,
        },
        {
          text: localizationText.HOME.INTERNATIONAL_TR,
          icon: icons.global_1,
          navigate: DashboardOptions.INTERNATIONAL_TR,
        },
        { text: localizationText.HOME.ATM_WITHDRAWALS, icon: icons.card, navigate: DashboardOptions.ATM_WITHDRAWALS },
      ],
    },
    {
      data: [
        {
          text: localizationText.HOME.LOCAL_TRANSFER,
          icon: <IpayFlagIcon country="ar" />,
          transfer_type: localizationText.HOME.LOCAL_TRANSFER,
          navigate: DashboardOptions.LOCAL_TRANSFER,
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
