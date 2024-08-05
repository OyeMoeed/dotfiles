interface SuccessItem {
  id: number;
  label: string;
  value: string;
  icon: string;
}

interface ItemProps {
  item: SuccessItem;
  index: number;
}

export { ItemProps, SuccessItem };
