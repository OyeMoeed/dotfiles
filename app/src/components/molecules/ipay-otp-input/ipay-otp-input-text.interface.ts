export interface IPayOtpInputTextProps {
  testID?: string;
  onChangeText: (arg: string) => void;
  isError?: boolean;
  value: string;
  setValue: (value: string) => void;
}
