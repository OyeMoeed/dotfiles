interface MOIItemProps {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

interface ItemProps {
  item: MOIItemProps;
  index: number;
}

export { ItemProps, MOIItemProps };
