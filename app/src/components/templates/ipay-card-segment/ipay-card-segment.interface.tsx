import { CardType } from '@app/network/services/cards-management/issue-card-inquire/issue-card-inquire.interface';
import { CardOptions } from '@app/utilities/enums.util';

interface IPayCardSegmentProps {
  testID?: string;
  selectedCardType: CardType;
  cardOption: CardOptions;
}

export default IPayCardSegmentProps;
