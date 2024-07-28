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
