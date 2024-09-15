import { LocalTransferConfirmResponseTypes } from './local-transfer-confirm.interface';

const LocalTransferConfirmMockResponse: LocalTransferConfirmResponseTypes = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd06b1948aaae4349a67292c0a199ef60',
    requestReference: '03252962744056970405',
  },
  response: {
    transactionId: 'TRN123456789',
    exchangeRate: '1.05',
    remittanceReferenceNumber: 'RRN789456123',
    totalTransactionAmount: '500.00',
    beneficiaryName: 'John Doe',
    transferNetwork: 'SWIFT',
    amountDebited: '505.00',
    amountDebitedCurrency: 'USD',
    amountCredited: '500.00',
    amountCreditedCurrency: 'EUR',
    totalDebitedFeeAmount: '5.00',
    otpRef: 'OTP123456',
    feesDeductedFromAmount: true,
  },
  successfulResponse: true,
};

export default LocalTransferConfirmMockResponse;
