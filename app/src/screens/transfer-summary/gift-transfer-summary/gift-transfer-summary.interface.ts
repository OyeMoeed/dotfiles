import { IW2WResRequest } from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.interface';
import { IW2WActiveFriends } from '@app/network/services/transfers/wallet-to-wallet-check-active/wallet-to-wallet-check-active.interface';

export type SendMoneyType = {
  id: number;
  subtitle?: string;
  amount?: string;
  notes?: string;
  mobileNumber?: string;
  name?: string;
  totalAmount?: string;
  transferPurpose?: string;
  walletNumber?: string;
};

export interface GiftItem {
  id: number;
  question: string;
  answer: string;
  index: number;
}

export interface GiftParamsProps {
  variant: string;
  data: {
    transfersDetails: {
      formInstances: SendMoneyType[];
      fees: IW2WResRequest[];
      giftDetails: { message: string; occasion: string };
    };
    activeFriends: IW2WActiveFriends[];
    totalAmount: number;
    transactionType?: string;
  };
}

export interface GiftTransferSummaryItem extends IW2WResRequest {
  name: string;
  id: string;
  transferReason: string;
}
