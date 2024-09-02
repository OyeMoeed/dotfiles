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
    billerCategoryList: [
      {
        code: '0',
        addtionalAttribute1: 'كل المفوترين',
        desc: 'All Billers',
      },
      {
        code: '1',
        addtionalAttribute1: 'الإتصالات',
        desc: 'Communications',
      },
      {
        code: '2',
        addtionalAttribute1: 'البنوك',
        desc: 'Banks',
      },
      {
        code: '3',
        addtionalAttribute1: 'الخدمات العامة',
        desc: 'Public Services',
      },
      {
        code: '4',
        addtionalAttribute1: 'الأمانات',
        desc: 'Municipalities',
      },
      {
        code: '5',
        addtionalAttribute1: 'الوزارات و الهيئات',
        desc: 'Ministries and Commisions',
      },
      {
        code: '6',
        addtionalAttribute1: 'مفوترين آخرين',
        desc: 'Other billers',
      },
      {
        code: '7',
        addtionalAttribute1: 'وزارة الداخلية',
        desc: 'Ministry of the Interior (MOI)',
      },
    ],
  },
  successfulResponse: true,
};

export default getBillersCategoriesMockResponse;
