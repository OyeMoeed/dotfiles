import { UseFormReturn } from 'react-hook-form';
import { AlinmaExpressBanks } from '@app/network/services/international-transfer/ae-beneficiary-banks/ae-beneficiary-banks.interface';
import { InternationalTransferValue } from '../international-beneficiary-transfer-form/international-beneficiary-transfer-form.interface';

interface ServiceData {
  recordID: string;
  serviceName: string;
  serviceLogo: string;
  type?: string;
  beneficiaryType?: string;
  serviceValue?: InternationalTransferValue;
}

interface AddBeneficiaryValues {
  currency?: string;
  country?: string;
  transferType?: string;
  remittanceType?: string;
  nickname?: string;
  deliveryType?: string;
  bank?: AlinmaExpressBanks;
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
