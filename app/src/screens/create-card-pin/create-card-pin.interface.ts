export enum CreateCardPinViewTypes {
  NewPin = 'NewPin',
  ConfirmNewPin = 'ConfirmNewPin',
}

export interface CreateCardPinProps {
  onSuccess?: () => void;
}
