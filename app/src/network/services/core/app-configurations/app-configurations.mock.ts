import { AppConfigurationsMockProps } from './app-configurations.interface';

const appConfigurationsMock: AppConfigurationsMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC8c1f48bbf67440c0890aafcd638914ce',
    requestReference: '05121498459656787151',
  },
  response: {
    parameters: [
      {
        name: 'AGE_YEARS_MINOR_ACCOUNT_LIMIT',
        value: '15',
        description: 'Age Years Minor Account Limit',
        type: 'number',
        category: 'login_config',
      },
      {
        name: 'AGE_YEARS_REGISTER_LIMIT',
        value: '9',
        description: 'Age Years Register Limit',
        type: 'number',
        category: 'login_config',
      },
      {
        name: 'MAZAYA_IS_ACTIVE',
        value: 'N',
        description: 'Mazaya is active',
        type: 'string',
        category: 'login_config',
      },
      {
        name: 'ONECARD_IS_ACTIVE',
        value: 'Y',
        description: 'One card is active',
        type: 'string',
        category: 'login_config',
      },
      {
        name: 'ACTIVE_THEME',
        value: 'DEFAULT',
        description: 'Active Theme',
        type: 'string',
        category: 'login_config',
      },
      {
        name: 'MUSANED_IS_NEW',
        value: 'Y',
        description: 'Musaned is new',
        type: 'string',
        category: 'login_config',
      },
      {
        name: 'PHYSICAL_CARD_ENABLED',
        value: 'N',
        description: 'is physical card enabled',
        type: 'string',
        category: 'login_config',
      },
    ],
  },
  successfulResponse: true,
};

export default appConfigurationsMock;
