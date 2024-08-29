import { WuRemittanceTypesProps } from './wu-remittance-types.interface';

const wuRemittanceTypesMock: WuRemittanceTypesProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    remittanceTypes: [
      {
        code: '000',
        desc: 'CASH',
        additionalAttribute1: 'نقدا',
      },
      {
        code: '500',
        desc: 'TO ACCOUNT',
        additionalAttribute1: 'إلى حساب',
      },
    ],
  },
  successfulResponse: true,
  ok: true,
  apiResponseNotOk: false,
};

export default wuRemittanceTypesMock;
