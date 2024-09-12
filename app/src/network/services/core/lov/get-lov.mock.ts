import { ApiResponse } from '../../services.interface';
import { IGetCoreLovResponse } from './get-lov.interface';

const getReasonForTransfers: ApiResponse<IGetCoreLovResponse> = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'commonService.lov.messege.success',
    sessionReference: 'SSPAYC0d9a95a5cb844b05a8dd25d8f0d6a046',
    requestReference: '01941282420683314081',
  },
  response: {
    lovInfo: [
      {
        recTypeCode: 'W003',
        recDesc: 'Donation',
        attribute1: 'مساعدات وتبرعات',
        recDescription: 'Donation',
      },
      {
        recTypeCode: 'W001',
        recDesc: 'Friends and Family Expenses',
        attribute1: 'مصاريف للأهل والأصدقاء',
        recDescription: 'Friends and Family Expenses',
      },
      {
        recTypeCode: 'W007',
        recDesc: 'Investment',
        attribute1: 'استثمار',
        recDescription: 'Investment',
      },
      {
        recTypeCode: 'W002',
        recDesc: 'Purchase',
        attribute1: 'شراء سلع',
        recDescription: 'Purchase',
      },
      {
        recTypeCode: 'W005',
        recDesc: 'Travel Expenses',
        attribute1: 'مصاريف سفر وحجوزات',
        recDescription: 'Travel Expenses',
      },
      {
        recTypeCode: 'W006',
        recDesc: 'Treatment',
        attribute1: 'علاج',
        recDescription: 'Treatment',
      },
      {
        recTypeCode: 'W004',
        recDesc: 'Tuition Expenses',
        attribute1: 'مصاريف دراسية',
        recDescription: 'Tuition Expenses',
      },
    ],
  },
  successfulResponse: true,
};

const getOccupations: ApiResponse<IGetCoreLovResponse> = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'commonService.lov.messege.success',
    sessionReference: 'SSPAYCb5db226788a2409fa270e1d1c5a61154',
    requestReference: '01941282420683314329',
  },
  response: {
    lovInfo: [
      {
        recTypeCode: '3',
        recDesc: 'ADVISOR',
        attribute1: 'مستشار',
        recDescription: 'ADVISOR',
      },
      {
        recTypeCode: '7',
        recDesc: 'ANNO OF THE H OF PRAYER',
        attribute1: 'مـــــــوذن ',
        recDescription: 'ANNO OF THE H OF PRAYER',
      },
      {
        recTypeCode: '8',
        recDesc: 'ANNOUNCER',
        attribute1: 'المذيع',
        recDescription: 'ANNOUNCER',
      },
      {
        recTypeCode: '10',
        recDesc: 'ARTIST',
        attribute1: 'الفنان',
        recDescription: 'ARTIST',
      },
      {
        recTypeCode: '12',
        recDesc: 'ATTORNEY AT LAW',
        attribute1: 'محامــــــــــي',
        recDescription: 'ATTORNEY AT LAW',
      },
      {
        recTypeCode: '1',
        recDesc: 'Accountant',
        attribute1: 'محاسب',
        recDescription: 'Accountant',
      },
      {
        recTypeCode: '2',
        recDesc: 'Administration',
        attribute1: 'الإدارة',
        recDescription: 'Administration',
      },
      {
        recTypeCode: '4',
        recDesc: 'Agriculture/farmer',
        attribute1: 'الزراعة / مزارع',
        recDescription: 'Agriculture/farmer',
      },
      {
        recTypeCode: '5',
        recDesc: 'All other occupations',
        attribute1: 'جميع مهن أخرى',
        recDescription: 'All other occupations',
      },
      {
        recTypeCode: '6',
        recDesc: 'Ambassador',
        attribute1: 'السفير',
        recDescription: 'Ambassador',
      },
      {
        recTypeCode: '9',
        recDesc: 'Architecture',
        attribute1: 'الهندسة المعمارية',
        recDescription: 'Architecture',
      },
      {
        recTypeCode: '11',
        recDesc: 'Assistant manager',
        attribute1: 'مساعد مدير',
        recDescription: 'Assistant manager',
      },
      {
        recTypeCode: '14',
        recDesc: 'BARBER',
        attribute1: 'حلاق',
        recDescription: 'BARBER',
      },
      {
        recTypeCode: '16',
        recDesc: 'BLACKSMITH',
        attribute1: 'الحداد',
        recDescription: 'BLACKSMITH',
      },
      {
        recTypeCode: '19',
        recDesc: 'BUSINESS MAN',
        attribute1: 'رجل أعمال',
        recDescription: 'BUSINESS MAN',
      },
      {
        recTypeCode: '13',
        recDesc: 'Bank staff',
        attribute1: 'موظف بنك',
        recDescription: 'Bank staff',
      },
      {
        recTypeCode: '15',
        recDesc: 'Barperson',
        attribute1: 'نادل',
        recDescription: 'Barperson',
      },
      {
        recTypeCode: '72',
        recDesc: 'Brigadier General',
        attribute1: 'عميد',
        recDescription: 'Brigadier General',
      },
      {
        recTypeCode: '18',
        recDesc: 'Brigadier general',
        attribute1: 'العميد',
        recDescription: 'Brigadier general',
      },
      {
        recTypeCode: '20',
        recDesc: 'CAPTAIN',
        attribute1: 'قائد',
        recDescription: 'CAPTAIN',
      },
      {
        recTypeCode: '21',
        recDesc: 'CAR TECHICIAN',
        attribute1: 'فنى السيارات',
        recDescription: 'CAR TECHICIAN',
      },
      {
        recTypeCode: '22',
        recDesc: 'CARPENTER',
        attribute1: 'النجار',
        recDescription: 'CARPENTER',
      },
    ],
  },
  successfulResponse: true,
};

const getCities: ApiResponse<IGetCoreLovResponse> = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'commonService.lov.messege.success',
    sessionReference: 'SSPAYCb5db226788a2409fa270e1d1c5a61154',
    requestReference: '01941282420683314334',
  },

  response: {
    lovInfo: [
      {
        recTypeCode: 'AL Jamsh',
        recDesc: 'AL Jamsh',
        attribute1: 'الجمش',
        attribute2: 'CENT',
        recDescription: 'AL Jamsh',
      },

      {
        recTypeCode: 'AL-BASHAYER',
        recDesc: 'AL-BASHAYER',
        attribute1: 'البشاير',
        attribute2: 'CENT',
        recDescription: 'AL-BASHAYER',
      },

      {
        recTypeCode: 'AL-BATRAA',
        recDesc: 'AL-BATRAA',
        attribute1: 'البتراء',
        attribute2: 'CENT',
        recDescription: 'AL-BATRAA',
      },

      {
        recTypeCode: 'AL-DAAER',
        recDesc: 'AL-DAAER',
        attribute1: 'الدائر',
        attribute2: 'CENT',
        recDescription: 'AL-DAAER',
      },

      {
        recTypeCode: 'AL-DARB',
        recDesc: 'AL-DARB',
        attribute1: 'الدرب',
        attribute2: 'CENT',
        recDescription: 'AL-DARB',
      },

      {
        recTypeCode: 'AL-FTEHAH',
        recDesc: 'AL-FTEHAH',
        attribute1: 'الفطيحة',
        attribute2: 'CENT',
        recDescription: 'AL-FTEHAH',
      },

      {
        recTypeCode: 'AL-HREDAH',
        recDesc: 'AL-HREDAH',
        attribute1: 'الحريضة',
        attribute2: 'CENT',
        recDescription: 'AL-HREDAH',
      },

      {
        recTypeCode: 'AL-HSENYAH',
        recDesc: 'AL-HSENYAH',
        attribute1: 'الحصينية',
        attribute2: 'CENT',
        recDescription: 'AL-HSENYAH',
      },

      {
        recTypeCode: 'AL-KOSYBAA',
        recDesc: 'AL-KOSYBAA',
        attribute1: 'القصيباء',
        attribute2: 'CENT',
        recDescription: 'AL-KOSYBAA',
      },

      {
        recTypeCode: 'AL-KOUBAH',
        recDesc: 'AL-KOUBAH',
        attribute1: 'الخوبة',
        attribute2: 'CENT',
        recDescription: 'AL-KOUBAH',
      },

      {
        recTypeCode: 'AL-MASKA',
        recDesc: 'AL-MASKA',
        attribute1: 'المسقي',
        attribute2: 'CENT',
        recDescription: 'AL-MASKA',
      },

      {
        recTypeCode: 'AL-OAYKILAH',
        recDesc: 'AL-OAYKILAH',
        attribute1: 'العويقيلة',
        attribute2: 'CENT',
        recDescription: 'AL-OAYKILAH',
      },

      {
        recTypeCode: 'AL-RAYAN BJAZAN',
        recDesc: 'AL-RAYAN BJAZAN',
        attribute1: 'الريان بجازان',
        attribute2: 'CENT',
        recDescription: 'AL-RAYAN BJAZAN',
      },

      {
        recTypeCode: 'AL-RWEDAH',
        recDesc: 'AL-RWEDAH',
        attribute1: 'الرويضة',
        attribute2: 'CENT',
        recDescription: 'AL-RWEDAH',
      },

      {
        recTypeCode: 'AL-SHAABAH',
        recDesc: 'AL-SHAABAH',
        attribute1: 'الشعبة',
        attribute2: 'CENT',
        recDescription: 'AL-SHAABAH',
      },

      {
        recTypeCode: 'AL-SHEEBAH',
        recDesc: 'AL-SHEEBAH',
        attribute1: 'الشعيبة',
        attribute2: 'CENT',
        recDescription: 'AL-SHEEBAH',
      },

      {
        recTypeCode: 'AL-SHKEK BJEZAN',
        recDesc: 'AL-SHKEK BJEZAN',
        attribute1: 'الشقيق بجازان',
        attribute2: 'CENT',
        recDescription: 'AL-SHKEK BJEZAN',
      },

      {
        recTypeCode: 'AL-SHKERY',
        recDesc: 'AL-SHKERY',
        attribute1: 'الشقيري',
        attribute2: 'CENT',
        recDescription: 'AL-SHKERY',
      },

      {
        recTypeCode: 'AL-SHMLY',
        recDesc: 'AL-SHMLY',
        attribute1: 'الشملي',
        attribute2: 'CENT',
        recDescription: 'AL-SHMLY',
      },

      {
        recTypeCode: 'ALADEED',
        recDesc: 'ALADEED',
        attribute1: 'العديد',
        attribute2: 'CENT',
        recDescription: 'ALADEED',
      },

      {
        recTypeCode: 'ALB',
        recDesc: 'ALB',
        attribute1: 'علب',
        attribute2: 'CENT',
        recDescription: 'ALB',
      },

      {
        recTypeCode: 'ALDORRA',
        recDesc: 'ALDORRA',
        attribute1: 'الدره',
        attribute2: 'CENT',
        recDescription: 'ALDORRA',
      },

      {
        recTypeCode: 'ALHADEETHA',
        recDesc: 'ALHADEETHA',
        attribute1: 'الحديثه',
        attribute2: 'CENT',
        recDescription: 'ALHADEETHA',
      },

      {
        recTypeCode: 'ALJWA',
        recDesc: 'ALJWA',
        attribute1: 'الجوة',
        attribute2: 'CENT',
        recDescription: 'ALJWA',
      },

      {
        recTypeCode: 'ALKHADHRA',
        recDesc: 'ALKHADHRA',
        attribute1: 'الخضراء',
        attribute2: 'CENT',
        recDescription: 'ALKHADHRA',
      },

      {
        recTypeCode: 'ALKHTAH',
        recDesc: 'ALKHTAH',
        attribute1: 'الخطة',
        attribute2: 'CENT',
        recDescription: 'ALKHTAH',
      },

      {
        recTypeCode: 'ALMOWASSAM',
        recDesc: 'ALMOWASSAM',
        attribute1: 'الموسم',
        attribute2: 'CENT',
        recDescription: 'ALMOWASSAM',
      },

      {
        recTypeCode: 'ALQORA',
        recDesc: 'ALQORA',
        attribute1: 'القرى',
        attribute2: 'CENT',
        recDescription: 'ALQORA',
      },

      {
        recTypeCode: 'ALSOWAIDRAH',
        recDesc: 'ALSOWAIDRAH',
        attribute1: 'الصويدرة',
        attribute2: 'CENT',
        recDescription: 'ALSOWAIDRAH',
      },

      {
        recTypeCode: 'ALTWAL',
        recDesc: 'ALTWAL',
        attribute1: 'الطوال',
        attribute2: 'CENT',
        recDescription: 'ALTWAL',
      },

      {
        recTypeCode: 'ALUMAIH',
        recDesc: 'ALUMAIH',
        attribute1: 'المويه',
        attribute2: 'CENT',
        recDescription: 'ALUMAIH',
      },

      {
        recTypeCode: 'ABHA',
        recDesc: 'Abha',
        attribute1: 'أبها',
        attribute2: 'SOUTH',
        recDescription: 'Abha',
      },

      {
        recTypeCode: 'ABO AREESH',
        recDesc: 'Abo Areesh',
        attribute1: 'أبو عريش',
        attribute2: 'SOUTH',
        recDescription: 'Abo Areesh',
      },

      {
        recTypeCode: 'AFEEF',
        recDesc: 'Afeef',
        attribute1: 'عفيف',
        attribute2: 'CENT',
        recDescription: 'Afeef',
      },
    ],
  },
  successfulResponse: true,
};

const getLovByCode = (lovCode: string) => {
  switch (lovCode) {
    case '184':
      return getReasonForTransfers;
    case '36':
      return getOccupations;
    case '6':
      return getCities;

    default:
      return getReasonForTransfers;
  }
};

export default getLovByCode;
