import { SendMoneyFormType } from '@app/screens/send-money-form/send-money-form.interface';

interface IPaySendMoneyFormProps {
  subtitle: string;
  showCount?: boolean;
  maxLength?: number;
  showReason?: boolean;
  testID?: string;
  setAmount: (id: number, text: string | number) => void;
  openReason?: (id: string | number) => void;
  showRemoveFormOption: (id: number) => void;
  addForm?: () => void;
  formInstances?: SendMoneyFormType[];
  setNotes: (id: number, text: string) => void;
  setSelectedItem: (text: string) => void;
}
interface FormInstanceType {
  amount: string;
  id: number;
  text: string;
  subtitle: string;
  selectedItem?: { id: string | number; text: string };
  notes?: string;
  hasWallet?: boolean;
}

export { FormInstanceType, IPaySendMoneyFormProps };
