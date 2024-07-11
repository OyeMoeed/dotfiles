export enum ChangeCardPinViewTypes {
  NewPin = 'NewPin',
  ConfirmNewPin = 'ConfirmNewPin',
  EnterReceiveOtp = 'EnterReceiveOtp',
}

export interface ChangeCardPinProps {
  onSuccess: () => void;
  handleOnPressHelp: () => void;
}
