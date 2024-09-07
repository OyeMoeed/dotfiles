// Import necessary interfaces
import { MockAPIStatusProps } from '@network/services/services.interface';

interface BankDetail {
  bankCode: string;
  bankName: string;
  branchName: string;
}

interface Beneficiary {
  beneficiaryAccountNumber: string;
  beneficiaryBankDetail: BankDetail;
  beneficiaryCode: string;
  beneficiaryStatus: string;
  fullName: string;
  isIBAN: boolean;
  nickname: string;
}

interface Response {
  beneficiaries: Beneficiary[];
}

interface LocalTransferBeneficiariesMockProps {
  response: Response;
  status: MockAPIStatusProps;
  successfulResponse: boolean;
}

export default LocalTransferBeneficiariesMockProps;
