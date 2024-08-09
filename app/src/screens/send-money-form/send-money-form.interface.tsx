type SendMoneyFormType = {
  id: number;
  subtitle: string;
  amount?: string | number;
  notes?: string;
  selectedItem?: string;
};

type SendMoneyFormSheet = {
  show: () => void;
  hide: () => void;
  formId: number;
};

interface UserDatails {
  text: string;
}

export { SendMoneyFormSheet, SendMoneyFormType, UserDatails };
