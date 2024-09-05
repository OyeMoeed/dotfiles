export enum ChangeCardPinViewTypes {
  CurrentPin = 'CurrentPin',
  NewPin = 'NewPin',
  ConfirmNewPin = 'ConfirmNewPin',
}

export interface ChangeCardPinProps {
  onSuccess?: () => void;
  currentCard?: any
}
