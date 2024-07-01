import { AppConfigurationsMockProps } from './app-configurations.interface';

const appConfigurationsMock: AppConfigurationsMockProps = {
  data: {
    response: {
      parameters: [
        {
          name: 'AGE_YEARS_REGISTER_LIMIT',
          description: 'Age Years Register Limit',
          type: 'number',
          category: 'login_config',
          value: '15',
        },
        {
          name: 'MAZAYA_IS_ACTIVE',
          description: 'Mazaya is active',
          type: 'string',
          category: 'login_config',
          value: 'Y',
        },
        {
          name: 'ONECARD_IS_ACTIVE',
          description: 'One card is active',
          type: 'string',
          category: 'login_config',
          value: 'Y',
        },
        {
          name: 'ACTIVE_THEME',
          description: 'Active Theme',
          type: 'string',
          category: 'login_config',
          value: 'DEFAULT',
        },
        {
          name: 'MUSANED_IS_NEW',
          description: 'Musaned is new',
          type: 'string',
          category: 'login_config',
          value: 'Y',
        },
      ],
    },
    successfulResponse: true,
    status: {
      sessionReference: 'SSPAYC5c2207e5333046a780efc88f0d60fc23',
      code: 'I000000',
      requestReference: '03939829382653694670',
      type: 'SUCCESS',
      desc: 'retail.msg.default.success',
    },
  },
  ok: true,
};

export default appConfigurationsMock;
