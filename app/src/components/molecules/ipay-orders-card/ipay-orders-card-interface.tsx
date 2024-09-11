interface IPayOrdersCardProps {
  data: Array;
  testID: string;
  onPressPurchase: () => void;
}

interface CategoriesItem {
  image: string;
  amount: string;
  data: string;
  title: string;
  coupon: string;
  purchase: string;
  date: string;
  code: string;
}

export { CategoriesItem, IPayOrdersCardProps };
