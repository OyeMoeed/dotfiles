import { WesternUnionBeneficiary } from '@app/network/services/international-transfer/western-union-beneficiary/western-union-beneficiary.interface';

interface InternationalBeneficiariesDetails {
  beneficiaryNickName: string;
  beneficiaryFullName: string;
  relationship: string;
  countryName: string;
  cityName: string;
  deliveryType: string;
  iban: string;
  bankName: string;
  currency: string;
}

interface SelectedReason {
  desc: string;
}

interface TransferGateway {
  transferMethod?: string;
  index: number;
}

interface Params {
  transferData: WesternUnionBeneficiary;
  transferGateway: string;
}
interface InternationalTransferInfoScreenProps {
  route: {
    params: Params;
  };
}

export { InternationalBeneficiariesDetails, InternationalTransferInfoScreenProps, SelectedReason, TransferGateway };
