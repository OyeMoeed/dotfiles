import { WesternUnionCountries } from '@app/network/services/international-transfer/wu-beneficiary-metadata/wu-beneficiary-metadata.interface';

interface ServiceData {
  recordID: string;
  serviceName: string;
  serviceLogo: string;
  type?: string;
  beneficiaryType?: string;
}

interface AddBeneficiaryValues {
  currency: string;
  country: string;
  transferType: string;
}
const AddBeneficiaryFields = {
  currency: 'currency',
  country: 'country',
  transferType: 'transferType',
};
interface ServiceDataProps {
  data: ServiceData;
  selectedService: ServiceData | null;
  setSelectedService: (service: ServiceData) => void;
  countryCode: string | null;
  setCountryCode: (code: string) => void;
  beneficiaryMetaData: WesternUnionCountries[];
  setCurrencyCode: (currency: string) => void;
  setRemittanceType: (type: string) => void;
  setAPIError: (error: string | null) => void;
  renderToast: (message: string) => void;
  isChecked: boolean;
}

export { AddBeneficiaryFields, AddBeneficiaryValues, ServiceData, ServiceDataProps };
