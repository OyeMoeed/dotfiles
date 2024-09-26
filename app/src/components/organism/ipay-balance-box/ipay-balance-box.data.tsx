import icons from '@app/assets/icons';
import { EhsanIcon } from '@app/assets/svgs';
import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import { DashboardOptions } from '@app/utilities';
import { useTranslation } from 'react-i18next';

const useCarouselData = () => {
  const { t } = useTranslation();

  const carouselData = [
    {
      data: [
        {
          text: t('HOME.SEND_MONEY'),
          icon: icons.send_money,
          navigate: DashboardOptions.SEND_MONEY,
        },
        {
          text: t('HOME.REQUEST_MONEY'),
          icon: icons.money_request,
          navigate: DashboardOptions.REQUEST_MONEY,
        },
        {
          text: t('HOME.SEND_GIFT_HEADING'),
          icon: icons.gift,
          isNew: true,
          navigate: DashboardOptions.SEND_GIFT,
        },
        {
          text: t('HOME.BILL_PAYMENTS'),
          icon: icons.receipt_item,
          navigate: DashboardOptions.BILL_PAYMENTS,
        },
        {
          text: t('HOME.INTERNATIONAL_TR'),
          icon: icons.global_1,
          navigate: DashboardOptions.INTERNATIONAL_TR,
        },
        { text: t('HOME.ATM_WITHDRAWALS'), icon: icons.card, navigate: DashboardOptions.ATM_WITHDRAWALS },
      ],
    },
    {
      data: [
        {
          text: t('HOME.LOCAL_TRANSFER'),
          icon: <IpayFlagIcon country="ar" />,
          transfer_type: t('HOME.LOCAL_TRANSFER'),
          navigate: DashboardOptions.LOCAL_TRANSFER,
        },
        { text: t('HOME.QR_ACCEPTANCE'), icon: icons.scanner, isNew: true },
        { text: t('HOME.SPENDING_LIMIT'), icon: icons.calculator },
        { text: t('HOME.MY_ACCOUNT'), icon: icons.user_tag },
        { text: t('HOME.MUSANED'), icon: icons.people, isNew: true, navigate: DashboardOptions.MUSANED },
        {
          text: t('HOME.EHSAN'),
          icon: <EhsanIcon />,
          navigate: DashboardOptions.EHSAN,
        },
      ],
    },
  ];

  return carouselData;
};

export default useCarouselData;
