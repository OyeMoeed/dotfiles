import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { Control, FieldErrors } from 'react-hook-form';

interface DynamicFieldRendererProps {
  field: DynamicField;
  control: Control;
  errors: FieldErrors;
  handleChange?: (index?: string, value?: string) => void;
  myIdValue?: string;
  myIdCheck?: boolean;
  handleParentLovChange?: (fieldIndex: string, selectedValue: string) => Promise<void>;
}

export default DynamicFieldRendererProps;
