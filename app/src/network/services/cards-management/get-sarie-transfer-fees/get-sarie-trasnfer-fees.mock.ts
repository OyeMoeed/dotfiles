import { GetSarieTransferFeesResponseTypes } from './get-sarie-transfer-fees.interface';

const GetSarieTransferFeesMockResponse: GetSarieTransferFeesResponseTypes = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'Alinmapay.cardManagement.feesInquiry.getFees.messege.success',
    sessionReference: 'SSPAYCc99bdb9298954d199be4dc260b510102',
    requestReference: '04268131955827439390',
  },
  response: {
    feeAmount: '0.00',
    vatAmount: '0.00',
    bankFeeAmount: '0.00',
    bankVatAmount: '0.00',
  },
  successfulResponse: true,
};

export default GetSarieTransferFeesMockResponse;
