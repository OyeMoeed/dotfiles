export interface IPayTopUpSelectionProps {
  testID: string;
  topupItemSelected: (routeName: string, params: {}) => void; // Function to close the bottom sheet
}
