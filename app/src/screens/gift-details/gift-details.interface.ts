interface SuccessItem {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
}

interface GiftDetails {
  trxId: string;
}

interface GiftDetailsParams {
  params: {
    isSend?: boolean;
    details: GiftDetails;
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
