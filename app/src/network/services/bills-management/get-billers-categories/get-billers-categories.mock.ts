import { GetBillersCategoriesResponseTypes } from './get-billers-categories.interface';

const getBillersCategoriesMockResponse: GetBillersCategoriesResponseTypes = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC29bf4368e6c04861af0256da48d444a7',
    requestReference: '06851820381011026737',
  },
  response: {
    categories: [
      { id: '001', name: 'Utilities' },
      { id: '002', name: 'Telecom' },
    ],
  },
  successfulResponse: true,
};

export default getBillersCategoriesMockResponse;
