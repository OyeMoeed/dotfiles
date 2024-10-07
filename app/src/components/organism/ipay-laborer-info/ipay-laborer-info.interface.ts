interface Item {
  text: string;
  details: string;
  key?: string;
}

interface IPayLaborerInfoProps {
  userData: Item[];
}

export { Item, IPayLaborerInfoProps };
