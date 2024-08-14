interface IPayAllCategoriesProps {
  testID: string;
  onPress: () => void;
}

interface CategoriesItem {
  image: string;
  title: string;
  data: string;
}

export { CategoriesItem, IPayAllCategoriesProps };
