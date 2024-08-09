type SendMoneyFormType = {
  id: number;
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
