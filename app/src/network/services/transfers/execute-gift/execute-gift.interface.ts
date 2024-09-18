import { DeviceInfoProps, MockAPIOkProp, MockAPIStatusProps } from '@network/services/services.interface';

interface ExecuteGiftPayload {
  trxReqType: string;
  trxId: string;
  deviceInfo: DeviceInfoProps;
}

interface ExecuteGiftRes {}

interface ExecuteGiftResponseDetails {
  response: ExecuteGiftRes;
  successfulResponse: boolean;
}

interface ExecuteGiftMockProps extends ExecuteGiftResponseDetails, MockAPIOkProp {
  status: MockAPIStatusProps;
  apiResponseNotOk?: boolean;
}

export { ExecuteGiftMockProps, ExecuteGiftPayload, ExecuteGiftRes };
