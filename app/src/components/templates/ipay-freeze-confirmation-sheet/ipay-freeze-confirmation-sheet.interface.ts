import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { CardActiveStatus } from '@app/utilities';
import { Dispatch, SetStateAction } from 'react';

export interface IPayFreezeConfirmationSheetHandle {
  show: () => void;
  hide: () => void;
}

export interface IPayFreezeConfirmationSheetProps {
  currentCard?: CardInterface;
  setActiveCardStatus?: Dispatch<SetStateAction<CardActiveStatus>>;
}
