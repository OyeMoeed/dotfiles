import { SendMoneyFormType } from '@app/screens/send-money-form/send-money-form.interface';

interface IPaySendMoneyFormProps {
  testID?: string;
  amount: string | number;
  setAmount: (text: string | number) => void;
  openReason?: () => void;
  selectedItem: (text: string) => void;
  showRemoveFormOption: (id: number) => void;
  addForm?: () => void;
  formInstances?: SendMoneyFormType[];
  notes: string;
  setNotes: (text: string) => void;
}

export default IPaySendMoneyFormProps;
 