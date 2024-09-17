import { TransferInfoData } from '@app/components/organism/ipay-transfer-information/ipay-transfer-information.interface';

interface SuccessItem {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
  currency?: string;
}

interface ItemProps {
  item: SuccessItem;
  index: number;
}

export { ItemProps, SuccessItem };

export interface TransferDetails {
  amount: string;
  beneficiaryNickName: string;
  transferPurpose: string;
  instantTransferType: string;
  note: string;
  refNumber: string;
  bankDetails?: TransferInfoData;
}
