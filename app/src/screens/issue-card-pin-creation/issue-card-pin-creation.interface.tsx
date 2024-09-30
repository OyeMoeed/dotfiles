import { CardInfo } from '@app/network/services/cards-management/issue-card-confirm/issue-card-confirm.interface';
import { ICardIssuanceDetails } from '@app/network/services/cards-management/issue-card-inquire/issue-card-inquire.interface';

export enum ChangeCardPinViewTypes {
  NewPin = 'NewPin',
  ConfirmNewPin = 'ConfirmNewPin',
  EnterReceiveOtp = 'EnterReceiveOtp',
}

export interface ChangeCardPinProps {
  onSuccess: (cardInfo?: CardInfo) => void;
  handleOnPressHelp: () => void;
  issuanceDetails: ICardIssuanceDetails;
  isPhysicalCard: boolean;
}
