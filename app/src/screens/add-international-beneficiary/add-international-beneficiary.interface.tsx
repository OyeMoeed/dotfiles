interface ServiceData {
  recordID: string;
  serviceName: string;
  serviceLogo: string;
  type?: string;
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
}

export { AddBeneficiaryFields, AddBeneficiaryValues, ServiceData, ServiceDataProps };

