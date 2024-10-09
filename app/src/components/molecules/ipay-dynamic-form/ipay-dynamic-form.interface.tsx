import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import {
  DynamicField,
  FormValuesType,
} from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { Control, FieldErrors, UseFormWatch } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';

interface DynamicFormComponentProps {
  fields: DynamicField[];
  control: Control;
  errors: FieldErrors;
  containerStyle?: StyleProp<ViewStyle>;
  handleChange?: (index?: string, value?: string) => void;
  myIdValue?: string;
  myIdCheck?: boolean;
  handleParentLovChange?: (fieldIndex: string, selectedValue: string | ListItem) => Promise<void>;
  watch?: UseFormWatch<FormValuesType>;
}

export default DynamicFormComponentProps;
