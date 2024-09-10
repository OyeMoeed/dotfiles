export enum ChangeCardPinViewTypes {
  CurrentPin = 'CurrentPin',
  NewPin = 'NewPin',
  ConfirmNewPin = 'ConfirmNewPin',
}

export interface ChangeCardPinProps {
  onSuccess?: any;
  currentCard?: any
}
