interface Params {
  amount: string;
  setTopUpAmount?: (value: Number) => {};
}

export interface ATMWithdrawQRCodeScannerScreenProps {
  route: {
    params: Params;
  };
  testID?: string;
}
