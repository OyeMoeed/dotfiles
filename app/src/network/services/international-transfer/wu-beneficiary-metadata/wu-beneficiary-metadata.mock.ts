import { ApiResponse } from '../../services.interface';
import WUBeneficiaryMetaDataProps from './wu-beneficiary-metadata.interface';

const wuBeneficiaryMetaDataMock: ApiResponse<WUBeneficiaryMetaDataProps> = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    westernUnionCountryList: [
      {
        code: 'PK',
        desc: 'Pakistan',
        ibanRequired: false,
        acceptsBankName: false,
        phoneCode: '92',
      },
    ],
  },
  successfulResponse: true,
};

export default wuBeneficiaryMetaDataMock;
