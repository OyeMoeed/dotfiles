interface SuccessItem {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
}

interface ItemProps {
  item: SuccessItem;
  index: number;
}

export { ItemProps, SuccessItem };

export interface RouteParams {
  amount: string;
  beneficiaryNickName: string;
  transferPurpose: string;
  fastConversionBy: string;
  note: string;
  refNumber: string;
}
