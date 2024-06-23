import icons from '@app/assets/icons';
import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
export const carouselData = [
  {
    data: [
        { text: 'Send Money', icon: icons.send_money},
        { text: 'Request Money', icon: icons.money_request },
        { text: 'Send Gift', icon: icons.gift},
        { text: 'Bill Payments', icon: icons.receipt_text },
        { text: 'International Tr.', icon: icons.global_1 },
        { text: 'ATM Withdrawals', icon: icons.card },
    ]
  },
  {
    data: [
        { text: 'Local transfer', icon: <IpayFlagIcon country='ar'/>},
        { text: 'QR acceptance', icon: icons.scanner },
        { text: 'Spending limit', icon: icons.calculator },
        { text: 'My account', icon:icons.user_tag},

    ]
  }
];
