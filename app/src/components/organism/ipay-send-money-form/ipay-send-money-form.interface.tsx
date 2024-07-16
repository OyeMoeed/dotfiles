interface IPaySendMoneyFormProps {
  testID?: string;
  amount: string;
  setAmount: (text: string | number) => void;
  openReason?: () => void;
  selectedItem?: () => void;
}

export default IPaySendMoneyFormProps;
