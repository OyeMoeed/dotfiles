interface PrepareIdRenewalProp {
  requestId?: string;
  channelId?: string;
}

enum NafathStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  EXPIRED = 'NF1900160',
  ACCEPTED = 'accepted',
}

interface INafathInqRes {
  response: {
    status: string;
    statusDesc: string;
    mainInfo: {
      idNumber: string;
      idVersion: string;
      idIssueDate: string;
      idIssueDateHijri: string;
      idExpiryDate: string;
      idExpiryDateHijri: string;
      nationality: string;
      nationalityDesc: string;
      arabicName: {
        firstName: string;
        secondName: string;
        thirdName: string;
        familyName: string;
        fullName: string;
      };
      englishName: {
        firstName: string;
        secondName: string;
        thirdName: string;
        familyName: string;
        fullName: string;
      };
      dateOfBirth: string;
      dateOfBirthHijri: string;
      gender: string;
      genderDesc: string;
      asJsonMessage: string;
      idIssuePlace: string;
      idIssuePlaceDesc: string;
    };
    employmentInfo: {
      employerName: string;
    };
  };
}

export interface IActivationAbsherReq {
  walletNumber?: string;
  walletTier?: string;
  poiNumber?: string;
  poiExpiryDate?: string;
  poiExpiryDateHijri?: string;
  birthDate?: string;
  birthDateHijri?: string;
  gender?: string;
  nationalityCode?: string;
  nationality?: string;
  iamVerificationDate?: string;
  usernameEn?: {
    firstName?: string;
    fatherName?: string;
    grandFatherName?: string;
    familyName?: string;
    fullName?: string;
  };
  usernameAr?: {
    firstName?: string;
    fatherName?: string;
    grandFatherName?: string;
    familyName?: string;
    fullName?: string;
  };
  deviceInfo?: any;
}

export { PrepareIdRenewalProp, NafathStatus, INafathInqRes };
