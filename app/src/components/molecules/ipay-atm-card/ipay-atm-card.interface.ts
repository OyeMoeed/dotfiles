import { CardCategories } from '@app/utilities/enums.util';

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
   * card variant can be any value from CardCategories types
   */
  cardType: CardCategories;
  /**
   * heading of the carousel tab
   */
  cardHeaderText: string;
  /**
   * expiry status of card
   */
  expired: boolean;
  /**
   * frozen status of card
   */
  frozen?: boolean;
  /**
   * suspend status of card
   */
  suspended?: boolean;
  /**
   * masked card number
   */
  maskedCardNumber?: string;
  /**
   * card index (id)
   */
  cardIndex?: string;
  /**
   * credit details
   */
  creditCardDetails?: any;
  /**
   * expiration date
   */
  expiryDate?: string
}

export interface IPayATMCardProps {
  /**
   * id to test element
   */
  testID?: string;
  /**
   * item having CardInterface types
   */
  card: CardInterface;
  /**
   * to get layout height and set in state
   */
  setBoxHeight?: (value: number) => void;
}