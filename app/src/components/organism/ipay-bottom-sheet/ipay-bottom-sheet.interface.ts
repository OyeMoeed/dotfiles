export interface IPayBottomSheetProps {
  children?: JSX.Element | JSX.Element[];
}

export interface IPayBottomSheetHandleProps {
  onPressCancel: () => void;
  onPressDone: () => void;
}
