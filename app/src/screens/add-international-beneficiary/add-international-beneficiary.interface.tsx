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
  recordID: string;
  serviceName: string;
  serviceLogo: string;
  type?: string;
}

export { AddBeneficiaryFields, AddBeneficiaryValues, ServiceDataProps };
