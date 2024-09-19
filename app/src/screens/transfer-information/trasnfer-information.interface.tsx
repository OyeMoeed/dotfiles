interface TransferInformationProps {
  bankCode: string;
  beneficiaryNickName: string;
  beneficiaryCode: string;
}

interface ReasonListItem {
  text: string;
  id: string;
}

export { ReasonListItem, TransferInformationProps };
