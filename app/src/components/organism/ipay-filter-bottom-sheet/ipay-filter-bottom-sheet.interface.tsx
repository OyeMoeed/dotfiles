// actionSheetProps.ts

export interface IPayFilterProps {
  testID?: string;
  /**
   * OnSubmit callback
   */
  onSubmit: (event: SubmitEvent) => void;
}
