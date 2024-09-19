type SendMoneyFormType = {
  id: number;
  subtitle?: string;
  amount?: string;
  notes?: string;
  mobileNumber?: string;
  name?: string;
  hasWallet?: boolean;
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
