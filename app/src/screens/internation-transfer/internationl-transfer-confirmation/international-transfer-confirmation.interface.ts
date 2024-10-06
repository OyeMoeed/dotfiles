import { WesternUnionBeneficiary } from '@app/network/services/international-transfer/western-union-beneficiary/western-union-beneficiary.interface';
import { WuFeesInquiryResponse } from '@app/network/services/international-transfer/wu-fees-inquiry/wu-fees-inquiry.interface';

interface TransferDetails {
  selectedReason: {
    desc: string;
    code?: string;
  };
  transferGateway: string;
  bankName: string;
  phoneNumber: string;
}

interface InquiryDetails {
  remitterCurrencyAmount: string;
  beneficiaryCurrencyAmount: string;
  isIncludeFees: boolean;
}

interface BeneficiarySuccessDetails extends WesternUnionBeneficiary, TransferDetails {}

export interface FeesInquiryData extends WuFeesInquiryResponse, InquiryDetails {}

interface Params {
  beneficiaryData: BeneficiarySuccessDetails;
  feesInquiryData: FeesInquiryData;
}

export interface InternationalTransferConfirmationProps {
  route: {
    params: Params;
  };
}
