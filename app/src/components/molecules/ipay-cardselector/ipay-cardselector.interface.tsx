interface IPayCardSelectorProps {
  onCardSelect: (selectedCard: number | null) => void;
  initialSelectedCard?: number | null;
  onPressPay: () => void;
  openPressExpired: () => void;
}
