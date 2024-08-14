import { DeviceInfoProps } from '../../services.interface';

export interface IGetLovResponse {
  lovInfo: LovInfo[];
}

export interface LovInfo {
  recTypeCode: string;
  recDesc: string;
  attribute1: string;
  recDescription: string;
}

export interface IGetLovPayload {
  lovType: string;
}

export interface IGetCoreLovResponse {
  lovInfo: LovInfo[];
}

export interface CoreLovInfo {
  recTypeCode: string;
  recDesc: string;
  attribute1: string;
  recDescription: string;
}

export interface IGetCoreLovPayload {
  lovType: string;
  lovCode2: string;
  deviceInfo: DeviceInfoProps;
}
