export interface IPayPointRedemptionConfirmatonProps {
  testID?: string;
  params: {
    redeemAmount: number;
    redeemPoints: number;
    totalpoints: number;
  };
}
