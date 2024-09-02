import { wuRefundRequestResponse } from './get-western_union_refund_request.interface';

const wuRefundRequestResponseData: wuRefundRequestResponse = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC1f7772b34d024c6a8b55a239097370bd',
    requestReference: '06851820381011026680',
  },
  response: { refundRequestsList: [] },
  successfulResponse: true,
};

export default wuRefundRequestResponseData;
