import { ApiResponse } from '../../services.interface';
import { BeneficiaryDetailsRes } from './beneficiaries-wu.interface';

const addWUBeneficiaryMock: ApiResponse<BeneficiaryDetailsRes> = {
  response: {
    beneficiaryCode: '10587981-7',
    beneficiaryStatus: 'newBeneficiary',
  },
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'Dear Partner .. The beneficiary has been added, please activate the beneficiary to be able to do a transfer transaction.',
    sessionReference: 'SSPAYC64431d0c4a0b4e44950c3c1540fd1cba',
    requestReference: '08432016497290053087',
  },
  successfulResponse: true,
};

export default addWUBeneficiaryMock;
