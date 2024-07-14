export interface IPayListDescriptionProps {
  leftIcon: string;
  rightIcon: string;
  title: string;
  subTitle: string;
  detailText?: string;
  onPress: () => void;
}

export interface IPayListToggleProps {
  leftIcon: string;
  title: string;
  onToggleChange: (isOn: boolean) => void;
  toggleState: boolean;
}

export interface ChangePinRefTypes {
  resetInterval: () => void;
}

export interface OpenBottomSheetRefTypes {
  showTermsAndConditions: () => void;
  close: () => void;
  present: () => void;
}

export interface DeleteCardSheetRefTypes {
  hide: () => void;
  show: () => void;
}
