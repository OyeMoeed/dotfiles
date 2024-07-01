import { ApplepayTopupMockProps } from './applepay-topup.interface';

const applepayTopupMock: ApplepayTopupMockProps = {
  data: {
    response: {
      feeAmount: '0.00',
      bankFeeAmount: '0.00',
      bankVatAmount: '0.00',
      vatAmount: '0.00',
      paymentGateway: 'CLICKPAY',
    },
    successfulResponse: true,
    status: {
      sessionReference: 'SSPAYC5c2207e5333046a780efc88f0d60fc23',
      code: 'I000000',
      requestReference: '00750728259257819756',
      type: 'SUCCESS',
      desc: 'Alinmapay.cardManagement.feesInquiry.getFees.messege.success',
    },
  },
  ok: true,
};

export default applepayTopupMock;
