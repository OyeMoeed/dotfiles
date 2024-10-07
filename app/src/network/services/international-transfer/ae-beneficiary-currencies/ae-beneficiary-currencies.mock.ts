import { ApiResponse } from '../../services.interface';
import { AECurrenciesInterface } from './ae-beneficiary-currencies.interface';

const aeBeneficiaryCountriesMock: ApiResponse<AECurrenciesInterface> = {
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
        code: 'SA',
        desc: 'Saudi Arabia',
      },
      {
        code: 'AE',
        desc: 'United Arab Emirates',
      },
    ],
  },
  successfulResponse: true,
};

export default aeBeneficiaryCountriesMock;
