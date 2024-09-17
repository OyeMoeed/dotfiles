import { TransferItem } from '@app/network/services/transfers/wallet-to-wallet-transfers/wallet-to-wallet-transfer.interface';

interface SuccessItem {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
}

interface GiftDetailsParams {
  params: {
    isSend?: boolean;
    details: TransferItem;
  };
}

interface GiftDetailsProps {
  route: GiftDetailsParams;
}

interface ItemProps {
  item: SuccessItem;
  index: number;
}

export { GiftDetailsProps, ItemProps, SuccessItem };
