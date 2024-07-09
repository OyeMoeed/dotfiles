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
