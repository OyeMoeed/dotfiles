type SendMoneyFormType = {
  id: number;
};

type SendMoneyFormSheet = {
  show: () => void;
  hide: () => void;
  formId: number;
};

export { SendMoneyFormSheet, SendMoneyFormType };
