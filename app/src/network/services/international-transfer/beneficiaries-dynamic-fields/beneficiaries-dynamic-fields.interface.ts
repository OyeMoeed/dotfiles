import { MockAPIStatusProps } from '../../services.interface';

interface DynamicField {
  index: string;
  maxWidth: number;
  label: string;
  type: string;
  required: boolean;
  integrationTagName?: string;
}

export interface DynamicFieldsResponse {
  dynamicFields: DynamicField[];
}

interface BeneficiariesFieldsProps {
  status: MockAPIStatusProps;
  response: DynamicFieldsResponse;
  successfulResponse: boolean;
  ok?: boolean;
  apiResponseNotOk?: boolean;
}
interface BeneficiariesDynamicFieldsReq {
  beneficiaryType?: string;
  remittanceType?: string;
  countryCode?: string;
  currencyCode?: string;
}

export { BeneficiariesDynamicFieldsReq, BeneficiariesFieldsProps, DynamicField };
