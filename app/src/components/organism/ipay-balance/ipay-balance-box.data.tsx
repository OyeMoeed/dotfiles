import icons from '@app/assets/icons';
import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
export const carouselData = [
  {
    data: [
      { text: 'Send Money', icon: icons.send_money, navigate: () => navigate(screenNames.WALLET_TRANSFER) },
      { text: 'Request Money', icon: icons.money_request },
      { text: 'Send Gift', icon: icons.gift, showTag: true },
      { text: 'Bill Payments', icon: icons.receipt_text },
      { text: 'International Tr.', icon: icons.global_1 },
      { text: 'ATM Withdrawals', icon: icons.card },
    ],
  },
  {
    data: [
      { text: 'Local transfer', icon: <IpayFlagIcon country="ar" /> },
      { text: 'QR acceptance', icon: icons.scanner, showTag: true },
      { text: 'Spending limit', icon: icons.calculator },
      { text: 'My account', icon: icons.user_tag },
    ],
  },
];
