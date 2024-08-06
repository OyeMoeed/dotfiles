import { CardTypes } from '@app/utilities/enums.util';
import { ViewStyle, StyleProp } from 'react-native';

export interface IPayCardDetailsBannerProps {
  /**
   * prop for card type
   */
  cardType: CardTypes;
  /**
   * prop for card type name or description
   */
  cardTypeName: string;
  /**
   * prop for card holder name display on component
   */
  carHolderName: string;
  /**
   * prop for passing styles from outside
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * prop for last four digit displayed on component
   */
  cardLastFourDigit: string;
}
