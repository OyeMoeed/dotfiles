import icons from '@app/assets/icons';
import { CalculatorIcon, CardIcon, FlagsIcon, GlobalIcon, ReceiptItem, RequestMoney, SendIcon, UserTagIcon } from '@app/assets/svgs/index';

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
        { text: 'Local transfer', icon: <FlagsIcon /> },
        { text: 'Spending limit', icon: icons.calculator },
        { text: 'QR acceptance', icon: icons.scanner },
        { text: 'My account', icon:icons.user_tag},
       


    ]
  }
];
