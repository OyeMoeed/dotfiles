import { CardStatusIndication, CardStatusType } from '@app/utilities/enums.util';
import { CardInterface } from '../ipay-atm-card/ipay-atm-card.interface';

export interface IPayCardStatusIndicationProps {
  /**
   * id to test element
   */
  testID?: string;
  /**
   * Indication of card status
   */
  statusIndication: CardStatusIndication.ANNUAL | CardStatusIndication.EXPIRY | CardStatusIndication.ANNUAL_EXPIRED;
  /**
   * to check the status of card
   */
  cardStatusType: CardStatusType.ALERT | CardStatusType.WARNING;
  /**
   * props for handling onPress
   */
  onPress: () => void;
  /**
   * current selected card from carousel
   */
  currentCard?: CardInterface;
}
