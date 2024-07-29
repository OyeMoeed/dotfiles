
interface IDeveiceInfo {
  deviceId?: string
  platform?: string
  platformVersion?: string
  hashCode?:string 
  deviceName?:string
  locationDetails?: {
      district?: string,
      city?: string,
      country?: string,
      latitude?: string,
      longitude?: string
  }
}

interface TestPrepareIdRenewalProp {
  walletNumber?: string;
}

interface PrepareIdRenewalProp {
  walletNumber?: string;
  deviceInfo?: IDeveiceInfo
}

interface IRenewIdConfirmReq {
  otpRef?: string
  otp?: string
  mobileNumber?: string
  authentication?: {
    transactionId?: string
  }
}

interface ConfirmIdRenewalProp {
  walletNumber?: string;
  confirmBody?: IRenewIdConfirmReq
}

export { IDeveiceInfo, PrepareIdRenewalProp, IRenewIdConfirmReq, ConfirmIdRenewalProp, TestPrepareIdRenewalProp };
