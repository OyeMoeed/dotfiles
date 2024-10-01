import { DeviceInfoProps } from '@app/network/utilities/utilities.interface';

// Define the structure for the status information
interface Status {
  code: string;
  type: string;
  desc: string;
  sessionReference: string;
  requestReference: string;
}

// Define the structure for the response
interface MockResponseProps {
  billId: string;
  billStatus: string;
}

// Define the structure for the entire mock
interface ActivateBillResponseProps {
  status: Status;
  response: MockResponseProps;
  successfulResponse: boolean;
}

interface InActivateBillProps {
  billNumOrBillingAcct?: string;
  billIdType?: string;
  billerId?: string;
  billerName?: string;
  walletNumber?: string;
  billNickname?: string;
  deviceInfo?: DeviceInfoProps;
}

export { ActivateBillResponseProps, InActivateBillProps, MockResponseProps };
