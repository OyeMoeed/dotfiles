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
    feeAmount: '10.00',
    vatAmount: '10.00',
    bankFeeAmount: '10.00',
    bankVatAmount: '10.00',
  },
  successfulResponse: true,
};

export default GetSarieTransferFeesMockResponse;
