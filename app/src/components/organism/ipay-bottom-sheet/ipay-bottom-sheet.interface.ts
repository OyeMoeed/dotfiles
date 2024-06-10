export interface IPayBottomSheetProps {
  children?: JSX.Element | JSX.Element[];
  customSnapPoint?: string[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  simpleHeader?: boolean;
  heading?: string;
}

export interface IPayBottomSheetHandleProps {
  onPressCancel: () => void;
  onPressDone: () => void;
  simpleHeader?: boolean;
  heading?: string;
}
