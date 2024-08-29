import { WUBeneficiaryCurrenciesProps } from './wu-beneficiary-currencies.interface';

const wuBeneficiaryCurrenciesMock: WUBeneficiaryCurrenciesProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    currencies: [
      {
        code: 'EGP',
        desc: 'EGYPTIAN POUND',
        addtionalAttribute1: 'جنيه مصرى',
      },
      {
        code: 'USD',
        desc: 'US DOLLAR',
        addtionalAttribute1: 'دولار أمريكي',
      },
    ],
  },
  successfulResponse: true,
  ok: true,
};

export default wuBeneficiaryCurrenciesMock;
