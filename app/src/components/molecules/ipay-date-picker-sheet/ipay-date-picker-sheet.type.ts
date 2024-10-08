interface IDatePickerSheetInterface {
  label: string;
  value?: string;
  errorMessage?: string;
  isError?: boolean;
  maximumDate?: Date | null;
  minimumDate?: Date | null;
  onChange: (value: string) => void;
}
export default IDatePickerSheetInterface;
