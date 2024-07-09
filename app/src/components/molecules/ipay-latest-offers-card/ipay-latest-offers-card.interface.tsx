/**
 * Props for the RNText component.
 */
export interface IPayLatestListCardProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string;
  offer: object | null;
  /**
   * trigger function when Press up.
   */
  onPressUp?: () => void;
  /**
   * trigger function when Press down.
   */
  onPressDown?: () => void;

  /**
   * indicator of last element in a list
   */
  isLastItem?: boolean;
}
