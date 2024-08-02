import { SendMoneyFormType } from '@app/screens/send-money-form/send-money-form.interface';

interface IPaySendMoneyFormProps {
  subtitle: string;
  testID?: string;
  amount: string | number;
  setAmount: (text: string | number) => void;
  openReason?: () => void;
  selectedItem: string;
  showRemoveFormOption: (id: number) => void;
  addForm?: () => void;
  formInstances?: SendMoneyFormType[];
  notes: string;
  setNotes: (text: string) => void;
  setSelectedItem: (text: string) => void;
}
interface FormInstanceType {
  amount: string;
  id: number;
  text: string;
  subtitle: string;
}

export { FormInstanceType, IPaySendMoneyFormProps };
