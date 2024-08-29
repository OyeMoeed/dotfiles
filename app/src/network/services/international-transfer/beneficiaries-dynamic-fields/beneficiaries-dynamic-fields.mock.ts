import { BeneficiariesFieldsProps } from './beneficiaries-dynamic-fields.interface';

const beneficiariesDynamicFieldsMock: BeneficiariesFieldsProps = {
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
        maxWidth: 35,
        label: 'First Name',
        type: 'englishCharacters',
        required: true,
      },
      {
        index: 'BEN.THIRD.NAME',
        maxWidth: 35,
        label: 'Third Name',
        type: 'englishCharacters',
        required: true,
      },
      {
        index: 'BEN.SECOND.NAME',
        maxWidth: 35,
        label: 'Second Name',
        type: 'englishCharacters',
        required: true,
      },
      {
        index: 'BEN.LAST.NAME',
        maxWidth: 35,
        label: 'Last Name',
        type: 'englishCharacters',
        required: true,
      },
    ],
  },
  successfulResponse: true,
  ok: true,
  apiResponseNotOk: false,
};

export default beneficiariesDynamicFieldsMock;
