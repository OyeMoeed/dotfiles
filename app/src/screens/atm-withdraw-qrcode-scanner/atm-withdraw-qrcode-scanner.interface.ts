interface Params {
  amount: string;
  setTopUpAmount?: (value: string) => {};
}

export interface ATMWithdrawQRCodeScannerScreenProps {
  route: {
    params: Params;
  };
  testID?: string;
}
