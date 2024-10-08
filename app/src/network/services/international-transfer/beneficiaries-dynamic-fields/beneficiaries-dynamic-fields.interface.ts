import { DynamicField } from '../../bills-management/dynamic-fields/dynamic-fields.interface';
import { MockAPIStatusProps } from '../../services.interface';
import { AlinmaExpressBanks } from '../ae-beneficiary-banks/ae-beneficiary-banks.interface';

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
  bank?: string | AlinmaExpressBanks;
}

export { BeneficiariesDynamicFieldsReq, BeneficiariesFieldsProps, DynamicField };
