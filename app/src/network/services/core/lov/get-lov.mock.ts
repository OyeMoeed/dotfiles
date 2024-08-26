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

const getLovByCode = (lovCode: string) => {
  switch (lovCode) {
    case '184':
      return getReasonForTransfers;

    default:
      return getReasonForTransfers;
  }
};

export default getLovByCode;
