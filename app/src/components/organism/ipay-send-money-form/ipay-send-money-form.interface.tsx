import { SendMoneyFormType } from "@app/screens/send-money-form/send-money-form.interface";

interface IPaySendMoneyFormProps {
  testID?: string;
  amount: string;
  setAmount: (text: string | number) => void;
  openReason?: () => void;
  selectedItem?: () => void;
  showRemoveFormOption: (id: number) => void;
  addForm?: () => void;
  formInstances?: SendMoneyFormType[];
}

export default IPaySendMoneyFormProps;
