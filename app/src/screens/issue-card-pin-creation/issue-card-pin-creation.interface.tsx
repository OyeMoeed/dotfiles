export enum ChangeCardPinViewTypes {
  NewPin = 'NewPin',
  ConfirmNewPin = 'ConfirmNewPin',
}

export interface ChangeCardPinProps {
  onSuccess?: () => void;
}
