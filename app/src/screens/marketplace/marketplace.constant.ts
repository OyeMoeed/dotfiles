/* eslint-disable @typescript-eslint/naming-convention */
import images from '@app/assets/images';
import { ShopCategory } from './marketplace.interface';

const categoryIconsByCode: { [key: string]: string } = {
  '3': images.entertainment,
  '11': images.food,
  '2': images.googlePlay,
  '7': images.onlineGames,
  '5': images.onlineStore,
  '10': images.playStation,
  '4': images.shopping,
};

const mapCategoriesByCode = (apiCategories: any[]) =>
  apiCategories.map((apiCategory: ShopCategory) => ({
    ...apiCategory, // Spread the original API category properties
    image: categoryIconsByCode[apiCategory.code] || null, // Assign the icon based on code
  }));

export { categoryIconsByCode, mapCategoriesByCode };
