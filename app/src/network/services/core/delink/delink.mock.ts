import { DelinkDeviceDataProps } from './delink-device.interface';

const delinkDeviceMock: DelinkDeviceDataProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC066dfff6747447e0a131f88de66297ac',
    requestReference: '07705376242783844123',
  },
  response: {
    walletNumber: '10587981',
    walletStatus: 'A',
    walletTier: 'G',
    availableBalance: '1840.92',
    currentBalance: '1845.92',
    dormant: false,
    idExpired: false,
  },
  successfulResponse: true,
  ok: true,
};

export default delinkDeviceMock;
