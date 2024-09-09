import { CardOptions, CardTypes } from '@app/utilities/enums.util';

interface IPayCardSegmentProps {
  testID?: string;
  selectedCardType: CardTypes;
  cardOption: CardOptions;
}

export default IPayCardSegmentProps;
