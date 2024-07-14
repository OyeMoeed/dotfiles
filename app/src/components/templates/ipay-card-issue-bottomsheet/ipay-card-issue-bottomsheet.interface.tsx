import { CardOptions } from '@app/utilities/enums.util';

export interface IPayCardIssueProps {
  onNextPress?: () => void;
  handleCardSelection: (selectedCard: CardOptions) => void;
  testID?: string;
  selectedCard?: string;
}
