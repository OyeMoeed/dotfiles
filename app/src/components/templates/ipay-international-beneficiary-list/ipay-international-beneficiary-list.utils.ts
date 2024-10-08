// Mapping keys of remittanceTypeDesc to locale keys
const remittanceTypeDescKeysMapping = (remittanceTypeDesc: string) => {
  switch (remittanceTypeDesc) {
    case 'CASH':
      return 'INTERNATIONAL_TRANSFER.CASH';
    case 'TO ACCOUNT':
      return 'INTERNATIONAL_TRANSFER.TO_ACCOUNT';
    case 'TO THIRD PARTY BANK':
      return 'INTERNATIONAL_TRANSFER.TO_ACCOUNT';
    default:
      return 'INTERNATIONAL_TRANSFER.TO_ACCOUNT';
  }
};

export default remittanceTypeDescKeysMapping;
