/* eslint-disable @typescript-eslint/naming-convention */

const MUSANED_URLS = {
  GET_INQUIRY: (walletNumber: string) => `transfer-management/v1/musaned-laborers/${walletNumber}/inquiry`,
  TRANSFER_TO_MUSANED_PREPARE: (walletNumber: string) =>
    `transfer-management/v1/musaned-laborers/${walletNumber}/transfer/prepare`,
  TRANSFER_TO_MUSANED_CONFIRM: (walletNumber: string) =>
    `transfer-management/v1/musaned-laborers/${walletNumber}/transfer/confirm`,
};

export default MUSANED_URLS;
