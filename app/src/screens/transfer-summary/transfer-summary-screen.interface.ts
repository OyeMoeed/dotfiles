// eslint-disable-next-line max-len
import { IW2WResRequest } from '@app/network/services/cards-management/wallet-to-wallet-fees/wallet-to-wallet-fees.interface';
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
    };
    totalAmount: number;
    transactionType?: string;
  };
}

export interface IW2WTransferSummaryItem extends IW2WResRequest {
  name: string;
  transferReason: string;
}
