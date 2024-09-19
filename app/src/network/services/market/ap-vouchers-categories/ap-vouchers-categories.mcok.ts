import ApVoucherCategoriesProps from './ap-vouchers-categories.interface';

const apVoucherCategories: ApVoucherCategoriesProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCedb9b22031ed46cdaa02fa6a7459313b',
    requestReference: '01009971995759254411',
  },
  response: {
    categories: [
      { code: '3', desc: 'Entertainment', addtionalAttribute1: 'الترفيه' },
      { code: '11', desc: 'Food & beverages', addtionalAttribute1: 'المأكولات والمشروبات' },
      { code: '2', desc: 'Google Play', addtionalAttribute1: 'جوجل بلاي' },
      { code: '7', desc: 'Online Games', addtionalAttribute1: 'العاب إلكترونية' },
      { code: '5', desc: 'Online Store', addtionalAttribute1: 'متاجر إلكترونية' },
      { code: '10', desc: 'PlayStation', addtionalAttribute1: 'بلايستيشن' },
      { code: '4', desc: 'Shopping', addtionalAttribute1: 'تسوق' },
    ],
  },
  successfulResponse: true,
};

export default apVoucherCategories;
