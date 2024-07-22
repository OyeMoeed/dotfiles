import { MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface delinkApiResponse {
  statusCode?: string;
  data?: object;
}

type DeviceInfoProps = {
  platformVersion: string;
  deviceId: string;
  deviceName: string;
  platform: string;
};


type DelinkPayload = {
  delinkReq: any;
  walletNumber?: string;
};

// Define the DelinkDeviceResponseDetails interface
interface DelinkDeviceResponseDetails {
  walletNumber: string;
  walletStatus: string;
  walletTier: string;
  availableBalance: string;
  currentBalance: string;
  dormant: boolean;
  idExpired: boolean;
}

// Define the DelinkDeviceDataProps interface that extends MockAPIDataProps with a specific response
interface DelinkDeviceDataProps extends MockAPIDataProps {
  response: DelinkDeviceResponseDetails;
}

// Extend the DelinkDeviceMockProps interface from DelinkDeviceDataProps and MockAPIOkProp
interface DelinkDeviceMockProps extends MockAPIOkProp {
  data: DelinkDeviceDataProps;
}

export { DelinkDeviceMockProps, DeviceInfoProps, delinkApiResponse, DelinkPayload };
