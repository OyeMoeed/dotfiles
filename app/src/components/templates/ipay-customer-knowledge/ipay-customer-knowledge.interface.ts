import { LovInfo } from '@app/network/services/core/lov/get-lov.interface';

export interface IPayCustomerKnowledgeProps {
  testID?: string;
  category?: string;
  onChangeCategory?: (category: string) => void;
  onSubmit?: (formData: IFormData) => void;
}

export interface IFormData {
  occupation: LovInfo;
  employee_name: string;
  income_source: { code: string; desc: string };
  monthly_income: { code: string; desc: string };
  city_name: LovInfo;
  district: string;
  street_name: string;
  postal_code: string;
  additional_code: string;
  building_number: string;
  unit_number: string;
}
