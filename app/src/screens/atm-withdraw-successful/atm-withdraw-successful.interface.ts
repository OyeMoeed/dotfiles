interface SuccessItem {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
}

interface ItemProps {
  item: SuccessItem;
}

interface Params {
  amount: string;
  referenceNumber: string;
}

interface ATMWithdrawalSuccessScreenProps {
  route: {
    params: Params;
  };
  testID?: string;
}

export { ItemProps, SuccessItem, ATMWithdrawalSuccessScreenProps };
