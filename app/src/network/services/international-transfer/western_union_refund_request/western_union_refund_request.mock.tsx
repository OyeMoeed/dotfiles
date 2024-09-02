import { wuRefundRequestResponse } from './western_union_refund_request.interface';


const wuRefundRequestResponseData: wuRefundRequestResponse = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCe5830ecf0b854d7586686c2e5a857856',
    requestReference: '06851820381011026683',
  },
  response: {},
  successfulResponse: true,
};

export default wuRefundRequestResponseData;
