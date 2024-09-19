interface ShopCategory {
  code?: string;
  desc?: string;
  addtionalAttribute1?: string;
}

interface MarketPlaceCategoriesProps {
  image: any;
  code?: string;
  desc?: string;
  addtionalAttribute1?: string;
}

interface ShopCategories {
  categories?: ShopCategory[];
}

export { MarketPlaceCategoriesProps, ShopCategories, ShopCategory };
