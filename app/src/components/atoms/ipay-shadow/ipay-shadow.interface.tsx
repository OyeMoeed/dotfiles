import { States } from '@app/utilities/enums.util';

/**
 * Props for the RNChip component.
 */
export interface IPayShadowProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string;
  /**
   * The heading text to be displayed above the input field.
   */

  variant?: States;
  /**
   * variant for the  component.
   */
  children?: React.ReactNode;
}
