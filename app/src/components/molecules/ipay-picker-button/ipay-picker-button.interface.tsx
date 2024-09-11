import { dateTimeFormat } from '@app/utilities';
import { PickerVariant } from '@app/utilities/enums.util';

export interface IPayPickerButtonProps {
  /**
   * A testID for the element used for testing purposes.
   */
  testID?: string;

  /**
   * A required property that must be one of the values specified in the VariantType type alias.
   * It determines the type of picker button.
   */
  variant: PickerVariant;

  /**
   * An optional property representing a date value.
   * It is used when the variant is 'date' or 'dateAndTime'.
   */
  date?: Date;

  /**
   * An optional callback function to be executed when the button is pressed.
   */
  onPress?: () => void;

  /**
   * An optional property representing the text to be displayed on the button.
   * It is used when the variant is 'text'.
   */
  text?: string;

  dateFormat?: dateTimeFormat;

  timeFormat?: dateTimeFormat;
}
