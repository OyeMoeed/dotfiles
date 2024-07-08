import CardItemProps from './ipay-card.interface';

interface IPayCardSelectorProps {
  testID?: string;
  openPressExpired: () => void;
  onPressAddCard: () => void;
  onCardSelect: (item: CardItemProps) => void;
}
export default IPayCardSelectorProps;
