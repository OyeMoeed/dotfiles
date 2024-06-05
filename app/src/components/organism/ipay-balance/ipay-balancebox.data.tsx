import { CalculatorIcon, CardIcon, FlagsIcon, Gift, Global, GlobalIcon, ReceiptItem, RequestMoney, SendIcon, UserTagIcon } from '@app/assets/svgs/index';

export const carouselData = [
  {
    data: [
        { text: 'Send Money', icon: <SendIcon /> },
        { text: 'Request Money', icon: <RequestMoney /> },
        { text: 'Send Gift', icon: <Gift /> },
        { text: 'Bill Payments', icon: <ReceiptItem /> },
        { text: 'International Tr.', icon: <GlobalIcon /> },
        { text: 'ATM Withdrawals', icon: <CardIcon /> },
    ]
  },
  {
    data: [
        { text: 'Local transfer', icon: <FlagsIcon /> },
        { text: 'Spending limit', icon: <CalculatorIcon /> },
        { text: 'QR acceptance', icon: <SendIcon /> },
        { text: 'My account', icon: <UserTagIcon /> },
       


    ]
  }
];
