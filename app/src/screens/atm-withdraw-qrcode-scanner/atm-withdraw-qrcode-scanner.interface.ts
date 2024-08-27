interface Params {
  amount: string;
}

export interface ATMWithdrawQRCodeScannerScreenProps {
  route: {
    params: Params;
  };
  testID?: string;
}
