import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { Control, FieldErrors } from 'react-hook-form';

interface DynamicFieldRendererProps {
  field: DynamicField;
  control: Control;
  errors: FieldErrors;
  handleChange?: () => void;
}

export default DynamicFieldRendererProps;
