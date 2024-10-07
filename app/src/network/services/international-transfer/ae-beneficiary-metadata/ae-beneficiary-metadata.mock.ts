import { ApiResponse } from '../../services.interface';
import { AEBeneficiaryMetaDataInterface } from './ae-beneficiary-metadata.interface';

const aeBeneficiaryMetaDataMock: ApiResponse<AEBeneficiaryMetaDataInterface> | undefined = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    alinmaExpressTypeList: [
      {
        code: 'DIRECT',
        desc: 'Direct Remittance',
      },
      {
        code: 'INDIRECT',
        desc: 'Indirect Remittance',
      },
    ],
  },
  successfulResponse: true,
};

export default aeBeneficiaryMetaDataMock;
