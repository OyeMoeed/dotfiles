export interface IPayBottomSheetProps {
  children?: JSX.Element;
  customSnapPoint?: string[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  simpleHeader?: boolean;
  heading?: string;
  onCloseBottomSheet?: () => void;
  simpleHeaderBar?: boolean;
  containerStyle?: object;
  simpleTitleStyle?: object;
}

export interface IPayBottomSheetHandleProps {
  onPressCancel: () => void;
  onPressDone: () => void;
  simpleHeader?: boolean;
  heading?: string;
  simpleHeaderBar?: boolean;
  simpleTitleStyle?: object;
}
