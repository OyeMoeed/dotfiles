import { ApiResponse } from '../../services.interface';
import { DynamicFieldsResponse } from './beneficiaries-dynamic-fields.interface';

const beneficiariesDynamicFieldsMock: ApiResponse<DynamicFieldsResponse> = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    dynamicFields: [
      {
        index: 'BEN.FRST.NAME',
        integrationTagName: 'BEN.FRST.NAME',
        maxWidth: 35,
        label: 'First Name',
        type: 'englishCharacters',
        required: true,
      },
      {
        index: 'BEN.THIRD.NAME',
        integrationTagName: 'BEN.THIRD.NAME',
        maxWidth: 35,
        label: 'Third Name',
        type: 'englishCharacters',
        required: true,
      },
      {
        index: 'BEN.SECOND.NAME',
        integrationTagName: 'BEN.SECOND.NAME',
        maxWidth: 35,
        label: 'Second Name',
        type: 'englishCharacters',
        required: true,
      },
      {
        index: 'BEN.LAST.NAME',
        integrationTagName: 'BEN.LAST.NAME',
        maxWidth: 35,
        label: 'Last Name',
        type: 'englishCharacters',
        required: true,
      },
    ],
  },
  successfulResponse: true,
};

const beneficiariesAEDynamicFieldsMock: ApiResponse<DynamicFieldsResponse> = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    dynamicFields: [
      {
        index: 'BEN.FULL.NAME',
        maxWidth: 35,
        label: 'Beneficiary Full Name',
        type: 'englishCharacters',
        required: true,
      },
    ],
  },
  successfulResponse: true,
};

export { beneficiariesAEDynamicFieldsMock, beneficiariesDynamicFieldsMock };
