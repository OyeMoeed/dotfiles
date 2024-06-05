export interface IPayBottomSheetHomeProps {
  children?: JSX.Element | JSX.Element[];
  customSnapPoint?: string[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  simpleHeader?: boolean;
  heading?: string;
  onCloseBottomSheet?: () => void;
  style?:object
}

export interface IPayBottomSheetHandleProps {
  onPressCancel: () => void;
  onPressDone: () => void;
  simpleHeader?: boolean;
  heading?: string;
}
