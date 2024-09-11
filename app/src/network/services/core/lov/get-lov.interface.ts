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
  lovInfo: CoreLovInfo[];
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

export interface IGetCoreManagementLovResponse {
  lovInfo: CoreManagementLovInfo[];
}

export interface CoreManagementLovInfo {
  recTypeCode: string; // code
  recDesc: string; // name
  attribute1: string; // translated name
  attribute2: string; // number maybe city id
  attribute3: string; // lang
  attribute4: string; // lat
  attribute5: string; // directions
  attribute6: string; // number maybe filter id
  attribute7: string;
  attribute8: string;
  attribute9: string;
  recDescription: string; // name
}

export interface IGetCoreManagementLovPayload {
  lovType: string;
  lovCode2?: string;
  deviceInfo: DeviceInfoProps;
}
