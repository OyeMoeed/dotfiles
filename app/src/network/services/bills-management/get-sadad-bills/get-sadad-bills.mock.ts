import { SadadBillsMockProps } from './get-sadad-bills.interface';

const sadadBillsMock: SadadBillsMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCe5830ecf0b854d7586686c2e5a857856',
    requestReference: '06851820381011026683',
  },
  response: {
    bills: [
      {
        billIndex: '123456',
        biller: {
          billerId: '789',
          billerDesc: 'Utility Provider',
          imageURL: 'https://example.com/utility-provider-logo.png',
          billerCategory: 'UTILITY',
          billerCategoryDesc: 'Utility Services',
          categoryImageURL: 'https://example.com/utility-category-image.png',
        },
        nickName: 'Electricity Bill',
        dueAmount: '80.00',
        dueAmountCurrency: 'USD',
        dueAmountCurrencyDesc: 'US Dollar',
        existInSADAD: true,
        billProfile: 'REGULAR',
        billAccountNumber: '9876543210',
        active: true,
        dueDateTime: '2024-07-21T12:00:00Z',
        billStatus: 'UNPAID',
        billStatusDesc: 'Unpaid',
        servicePaymentType: 'One-time',
        billPaymentStatus: 'PENDING',
        billPaymentStatusDesc: 'Pending',
        payDueAmountByDefault: true,
      },
      {
        billIndex: '123457',
        biller: {
          billerId: '789',
          billerDesc: 'Utility Provider',
          imageURL: 'https://example.com/utility-provider-logo.png',
          billerCategory: 'UTILITY',
          billerCategoryDesc: 'Utility Services',
          categoryImageURL: 'https://example.com/utility-category-image.png',
        },
        nickName: 'Electricity Bill 2',
        dueAmount: '110.00',
        dueAmountCurrency: 'SAR',
        dueAmountCurrencyDesc: 'Saudi Riyal',
        existInSADAD: true,
        billProfile: 'REGULAR',
        billAccountNumber: '9876543211',
        active: true,
        dueDateTime: '2024-07-21T12:00:00Z',
        billStatus: 'UNPAID',
        billStatusDesc: 'Unpaid',
        servicePaymentType: 'One-time',
        billPaymentStatus: 'PENDING',
        billPaymentStatusDesc: 'Pending',
        payDueAmountByDefault: true,
      },
      {
        billIndex: '789012',
        biller: {
          billerId: '456',
          billerDesc: 'Internet Provider',
          imageURL: 'https://example.com/internet-provider-logo.png',
          billerCategory: 'INTERNET',
          billerCategoryDesc: 'Internet Services',
          categoryImageURL: 'https://example.com/internet-category-image.png',
        },
        nickName: 'Internet Bill',
        dueAmount: '50.00',
        dueAmountCurrency: 'USD',
        dueAmountCurrencyDesc: 'US Dollar',
        existInSADAD: false,
        billProfile: 'IRREGULAR',
        billAccountNumber: '1234567890',
        active: false,
        dueDateTime: '2024-07-15T08:00:00Z',
        billStatus: 'PAID',
        billStatusDesc: 'Paid',
        servicePaymentType: 'Recurring',
        billPaymentStatus: 'COMPLETED',
        billPaymentStatusDesc: 'Completed',
        payDueAmountByDefault: false,
      },
    ],
    landingPageBillsCountAccurate: true,
  },
  successfulResponse: true,
};

export default sadadBillsMock;
