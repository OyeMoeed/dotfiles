import { cardTypes } from '@app/utilities/enums.util';

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
   * card variant can be any value from cardTypes types
   */
  cardVariant: cardTypes;
  /**
   * heading of the carousel tab
   */
  cardHeaderText: string;
}

export interface IPayATMCardProps {
  /**
   * item having CardInterface types
   */
  item: CardInterface;
}
