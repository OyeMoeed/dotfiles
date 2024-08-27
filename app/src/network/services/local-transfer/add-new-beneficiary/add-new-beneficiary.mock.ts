import { LocalTransferAddBeneficiaryMockProps } from './add-new-beneficiary.interface';

const localTransferAddBeneficiaryMock: LocalTransferAddBeneficiaryMockProps = {
  data: {
    beneficiaryCode: '10587981-8',
    beneficiaryStatus: 'newBeneficiary',
  },
  successfulResponse: true,
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'Dear Partner .. The beneficiary has been added, please activate the beneficiary to be able to do a transfer transaction.',
    sessionReference: 'SSPAYC8cfc4056e31948f0ac43b4d301602b58',
    requestReference: '08432016497290053143',
  },
  ok: false,
  apiResponseNotOk: false,
};

export default localTransferAddBeneficiaryMock;
