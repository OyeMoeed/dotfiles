import { spinnerVariant } from '@app/utilities/enums.util';

interface IPaySpinnerProps {
  testID?: string;
  // TestId used for testing purposes
  text?: string;
  // Displays the text if the text variant is called
  variant?: spinnerVariant;
  // variants of the spinner, influencing the visual appearence
  color?: string;
  // color of the activity spinner
  hasBackgroundColor?: boolean;
}

interface IPaySpinnerContainerProps {
  visible: boolean;
  spinnerProps: IPaySpinnerProps;
}

export { IPaySpinnerContainerProps, IPaySpinnerProps };
