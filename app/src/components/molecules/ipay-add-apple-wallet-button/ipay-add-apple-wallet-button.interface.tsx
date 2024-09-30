import { CardInterface } from '../ipay-atm-card/ipay-atm-card.interface';

interface IPayAddAppleWalletProps {
  isAdded?: boolean;
  onPress?: () => void;
  selectedCard?: CardInterface;
}

export default IPayAddAppleWalletProps;
