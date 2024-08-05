import MoneyRequestStatus from '@app/enums/money-request-status.enum';
import { isAndroidOS } from '@app/utilities/constants';
import { MappingType } from './iipay-request-detail.interface';

const typeFieldMapping: MappingType = {
  [MoneyRequestStatus.CANCEL]: [
    'status',
    'sender_mobile_number',
    'receiver_mobile_number',
    'note',
    'send_date',
    'request_date',
    'cancellation_date',
  ],
  [MoneyRequestStatus.PAID]: [
    'status',
    'sender_mobile_number',
    'receiver_mobile_number',
    'note',
    'send_date',
    'request_date',
    'payment_date',
    'ref_number',
  ],
  [MoneyRequestStatus.PENDING]: [
    'status',
    'sender_mobile_number',
    'receiver_mobile_number',
    'note',
    'send_date',
    'request_date',
  ],
  [MoneyRequestStatus.REJECTED]: [
    'status',
    'sender_mobile_number',
    'receiver_mobile_number',
    'note',
    'send_date',
    'request_date',
    'rejection_date',
    'ref_number',
  ],
};

const heightMapping = {
  [MoneyRequestStatus.PAID]: isAndroidOS ? '80%' : '87%',
  [MoneyRequestStatus.PENDING]: isAndroidOS ? '80%' : '87%',
  [MoneyRequestStatus.REJECTED]: isAndroidOS ? '83%' : '90%',
  [MoneyRequestStatus.CANCEL]: isAndroidOS ? '70%' : '77%',
};

export { heightMapping, typeFieldMapping };
