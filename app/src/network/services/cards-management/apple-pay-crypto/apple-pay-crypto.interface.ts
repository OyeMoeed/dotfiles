import { DeviceInfoProps } from '../../services.interface';

export interface IAPPLECRYPTOREQ {
  deviceInfo: DeviceInfoProps;
  nonce: string;
  nonceSig: string;
  certificates: any;
  primaryAccountNumberPrefix: any;
  networkName?: any;
  cardIndex?: any;
}
