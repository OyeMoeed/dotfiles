export type CallbackProps = {
  nextComponent?: string;
  data?: any;
};
export interface SetPasscodeComponentProps {
  testID?: string;
  onCallback?: (args: CallbackProps) => void;
  passcode?: string;
  passcodeReacted?: () => void;
  phoneNumber?: string;
  onPressHelp?: () => void;
  onConfirmPress?: () => void;
  showVerify?: boolean;

  iqamaId?: string;
}

export interface IPayHelpCenterProps {
  testID?: string;
}

export interface OTPVerificationRefTypes {
  resetInterval: () => void;
}
