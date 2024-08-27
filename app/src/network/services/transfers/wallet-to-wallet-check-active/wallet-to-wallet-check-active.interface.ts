import { DeviceInfoProps } from '../../services.interface';

export interface IW2WCheckActiveReq {
  mobileNumbers: string[];
  deviceInfo: DeviceInfoProps;
}

export interface IW2WCheckActiveRes {
  friends: IW2WActiveFriends[];
}

export interface IW2WActiveFriends {
  walletNumber?: string;
  nickName?: string;
  mobileNumber?: string;
  favouritFriend?: null;
  profileImage?: string;
  frequent?: boolean;
  eligible?: boolean;
}
