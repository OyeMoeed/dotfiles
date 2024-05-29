import { spinnerVariant } from '@app/utilities/enums.util';

export interface IPaySpinnerProps {
  testID: string;
  // TestId used for testing purposes
  text: string;
  // Displays the text if the text variant is called
  variant: spinnerVariant;
  // variants of the spinner, influencing the visual appearence
  color: string;
  // color of the activity spinner
}
