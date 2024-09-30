import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { Control, FieldErrors } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';

interface DynamicFormComponentProps {
  fields: DynamicField[];
  control: Control;
  errors: FieldErrors;
  containerStyle?: StyleProp<ViewStyle>;
  handleChange?: (index?: string, value?: string) => void;
  myIdValue?: string;
  myIdCheck?: boolean;
  handleParentLovChange?: (fieldIndex: string, selectedValue: string) => Promise<void>;
}

export default DynamicFormComponentProps;
