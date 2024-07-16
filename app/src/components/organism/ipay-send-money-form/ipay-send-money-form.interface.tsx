interface IPaySendMoneyFormProps {
  testID?: string;
  amount: string;
  setAmount: (text: string | number) => void;
  openReason?: () => void;
  selectedItem?: () => void;
  showRemoveFormOption: (id: number) => void;
  addForm?: () => void;
  formInstances?: () => void;
}

export default IPaySendMoneyFormProps;
