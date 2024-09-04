import {
  DeleteSingleNotificationMockProps,
  GetAllRetainedMessagesMockProps,
  ReadSingleNotificationMockProps,
} from './notifications.interface';

const getAllRetainedMessagesMock: GetAllRetainedMessagesMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC8a5d5083b8d149fb863fcdfbf0eb2475',
    requestReference: '04707270124080233182',
  },
  paginationInfo: { matchedRecords: '55', sentRecords: '9' },
  response: {
    retainedMessages: [
      {
        messageId: '555420',
        notificationMethod: 'ALERT_PAYE',
        messageHeader: 'Delink Device',
        messageBody:
          'The device samsung has been delinked from your wallet   If you have not delinked the device, please change the passcode',
        receivedDate: '2024-03-05T17:21:41',
        eventCode: '1087',
        read: false,
        deleted: false,
      },
      {
        messageId: '555116',
        notificationMethod: 'ALERT_PAYE',
        messageHeader: 'فك إرتباط الجهاز',
        messageBody: 'تم إلغاء ربط الجهاز WA25P بمحفظتك   إذا لم تقم بإلغاء ربط الجهاز، الرجاء تغيير رمز المرور',
        receivedDate: '2024-02-18T15:12:39',
        eventCode: '1087',
        read: false,
        deleted: false,
      },
      {
        messageId: '553484',
        notificationMethod: 'ALERT_PAYE',
        messageHeader: 'Delink Device',
        messageBody:
          'The device unknown has been delinked from your wallet   If you have not delinked the device, please change the passcode',
        receivedDate: '2024-02-07T13:58:05',
        eventCode: '1087',
        read: false,
        deleted: false,
      },
      {
        messageId: '553130',
        notificationMethod: 'ALERT_PAYE',
        messageHeader: 'Delink Device',
        messageBody:
          'The device Apple has been delinked from your wallet   If you have not delinked the device, please change the passcode',
        receivedDate: '2024-01-25T10:16:06',
        eventCode: '1087',
        read: false,
        deleted: false,
      },
      {
        messageId: '553126',
        notificationMethod: 'ALERT_PAYE',
        messageHeader: 'Delink Device',
        messageBody:
          'The device Apple has been delinked from your wallet   If you have not delinked the device, please change the passcode',
        receivedDate: '2024-01-24T15:15:15',
        eventCode: '1087',
        read: false,
        deleted: false,
      },
      {
        messageId: '553125',
        notificationMethod: 'ALERT_PAYE',
        messageHeader: 'Delink Device',
        messageBody:
          'The device Apple has been delinked from your wallet   If you have not delinked the device, please change the passcode',
        receivedDate: '2024-01-24T15:05:43',
        eventCode: '1087',
        read: false,
        deleted: false,
      },
      {
        messageId: '552819',
        notificationMethod: 'ALERT_PAYE',
        messageHeader: 'Delink Device',
        messageBody:
          'The device Apple has been delinked from your wallet   If you have not delinked the device, please change the passcode',
        receivedDate: '2024-01-10T15:34:38',
        eventCode: '1087',
        read: false,
        deleted: false,
      },
      {
        messageId: '552815',
        notificationMethod: 'ALERT_PAYE',
        messageHeader: 'Card Issuance',
        messageBody:
          'Dear Customer,\nCongraulation your  VPPP has been issued successfully!. Now you can add your card to your wallet and enjoy using the card online\n',
        receivedDate: '2024-01-10T14:17:12',
        eventCode: '1343',
        read: false,
        deleted: false,
      },
      {
        messageId: '552813',
        notificationMethod: 'ALERT_PAYE',
        messageHeader: 'Accept Money Request',
        messageBody: 'Credit via wallet transfer From:Musaned  Musaned Amount:100 SAR Date:2024-01-10 14:15',
        receivedDate: '2024-01-10T14:15:28',
        eventCode: '571',
        read: false,
        deleted: false,
      },
    ],
  },
  successfulResponse: true,
  ok: true,
};

const readSingleNotificationsMock: ReadSingleNotificationMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC80e2a7cf81cb42c9b516d73fae725f28',
    requestReference: '04707270124080233191',
  },
  response: {},
  successfulResponse: true,
  ok: true,
};

const deleteSingleNotificationMock: DeleteSingleNotificationMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC56ff09c5344e448c8d48bd1efe0225f6',
    requestReference: '04707270124080233198',
  },
  response: {},
  successfulResponse: true,
  ok: true,
};

export { getAllRetainedMessagesMock, readSingleNotificationsMock, deleteSingleNotificationMock };
