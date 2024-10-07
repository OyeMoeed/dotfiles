import { UseFormReturn } from 'react-hook-form';
import { InternationTransferValue } from '../international-beneficiary-transfer-form/international-beneficiary-transfer-form.interface';

interface ServiceData {
  recordID: string;
  serviceName: string;
  serviceLogo: string;
  type?: string;
  beneficiaryType?: string;
  serviceValue?: InternationTransferValue;
}

interface AddBeneficiaryValues {
  currency?: string;
  country?: string;
  transferType?: string;
  remittanceType?: string;
  nickname?: string;
  deliveryType?: string;
  bank?: string;
}
const AddBeneficiaryFields = {
  currency: 'currency',
  country: 'country',
  transferType: 'transferType',
};

interface ServiceDataProps {
  data: ServiceData;
  formProps: UseFormReturn<AddBeneficiaryValues>;
}

export { AddBeneficiaryFields, AddBeneficiaryValues, ServiceData, ServiceDataProps };
