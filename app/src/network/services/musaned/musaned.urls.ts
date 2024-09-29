/* eslint-disable @typescript-eslint/naming-convention */

const MUSANED_URLS = {
  GET_INQUIRY: (walletNumber: string) => `/v1/musaned-laborers/${walletNumber}/inquiry`,
};

export default MUSANED_URLS;
