
export interface IPayCardIssueProps {
  onNextPress: () => void;
  onCardSelectedChange?: (selectedCard: string | null) => void; // New prop
  testID: string | object;
  showSelectedCard?: boolean;
}
