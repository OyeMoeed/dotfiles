import { AlinmaExpressBeneficiary } from '@app/network/services/international-transfer/alinma-express-beneficiary/alinma-express-beneficiary.interface';
import { WesternUnionBeneficiary } from '@app/network/services/international-transfer/western-union-beneficiary/western-union-beneficiary.interface';

// Define an interface for the beneficiaryDetails
export type BeneficiaryDetailsProps = AlinmaExpressBeneficiary | WesternUnionBeneficiary;
