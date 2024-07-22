import { Control, FieldValues, UseFormGetValues, UseFormProps } from 'react-hook-form';

interface IPayCustomerKnowledgeDefaultProps<TFieldValues extends FieldValues = FieldValues, TContext = object> {
  onChangeCategory?: (category: string) => void;
  getValues?: UseFormGetValues<TFieldValues>;
  control?: Control<TFieldValues, TContext>;
  errors?: UseFormProps<TFieldValues>;
}
export default IPayCustomerKnowledgeDefaultProps;
