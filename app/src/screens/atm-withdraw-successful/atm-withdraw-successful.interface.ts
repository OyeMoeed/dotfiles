interface SuccessItem {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
}

interface ItemProps {
  item: SuccessItem;
}

export { ItemProps, SuccessItem };
