import { CardActiveStatus } from '@app/utilities';
import { Dispatch, SetStateAction } from 'react';

export interface IPayFreezeConfirmationSheetHandle {
  show: () => void;
  hide: () => void;
}

export interface IPayFreezeConfirmationSheetProps {
  setActiveCardStatus?: Dispatch<SetStateAction<CardActiveStatus>>;
}
