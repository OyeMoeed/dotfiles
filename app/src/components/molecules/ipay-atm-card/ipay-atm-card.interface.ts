import { cardCategories } from '@app/utilities/enums.util';

export interface CardInterface {
  /**
   * name of the card holder
   */
  name: string;
  /**
   * card number
   */
  cardNumber: string;
  /**
   * card variant can be any value from cardCategories types
   */
  cardVariant: cardCategories;
  /**
   * heading of the carousel tab
   */
  cardHeaderText: string;
}

export interface IPayATMCardProps {
  /**
   * id to test element
   */
  testID?: string;
  /**
   * item having CardInterface types
   */
  item: CardInterface;
}
