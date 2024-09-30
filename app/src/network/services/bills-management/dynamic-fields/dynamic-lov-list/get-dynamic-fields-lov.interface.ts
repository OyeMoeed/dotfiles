export interface ChildLovItem {
  code: string;
  desc: string;
  additionalAttribute1?: string; // Optional additional attributes if needed
  [key: string]: any; // For any dynamic attributes
}

export interface GetChildLovsResponseTypes {
  status: {
    code: string;
    type: string;
    desc: string;
    sessionReference?: string;
    requestReference?: string;
  };
  response: {
    lovList: ChildLovItem[];
  };
  successfulResponse: boolean;
}

export interface GetChildLovsParams {
  lovType: string;
  filter1: string;
}
