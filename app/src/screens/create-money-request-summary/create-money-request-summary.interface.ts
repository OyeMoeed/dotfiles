import { IW2WResRequest } from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.interface';
import { IW2WActiveFriends } from '@app/network/services/transfers/wallet-to-wallet-check-active/wallet-to-wallet-check-active.interface';
import { SendMoneyFormType } from '../send-money-form/send-money-form.interface';

export interface GiftItem {
  id: number;
  question: string;
  answer: string;
  index: number;
}

export interface ParamsProps {
  variant: string;
  data: {
    transfersDetails: {
      formInstances: SendMoneyFormType[];
      fees: IW2WResRequest[];
      activeFriends: IW2WActiveFriends[];
    };
    totalAmount: number;
    transactionType?: string;
  };
}

export interface IW2WTransferSummaryItem extends IW2WResRequest {
  name: string;
  transferReason: string;
}
