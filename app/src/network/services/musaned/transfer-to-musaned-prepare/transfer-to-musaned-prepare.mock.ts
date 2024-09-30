import { TransferToMusanedPrepareMockProps } from './transfer-to-musaned-prepare.interface';

const musanedInquiryMock: TransferToMusanedPrepareMockProps = {
  employeePoi: '2339846541',
  transferJustificationType: 'DEDUCTED_SALARY',
  salaryMonth: '2023:12',
  amountWithDeduction: '15',
  transferJustificationDescription: 'تأجير/سكن',
  transactionDescription: 'Any Description for Trx if needed',
  deviceInfo: {
    platformVersion: '10',
    deviceId: 'WAP,WAP,WAP',
    deviceName: 'WAP',
    platform: 'ANDROID',
  },
};

export default musanedInquiryMock;
