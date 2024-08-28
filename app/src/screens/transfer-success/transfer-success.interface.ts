interface SuccessItem {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
  currency?: string;
}

interface ItemProps {
  item: SuccessItem;
  index: number;
}

export { ItemProps, SuccessItem };
