import IPayPointsRedemptionConfirmation from '@app/components/organism/ipay-points-redemption-confirmation/ipay-points-redemption-confirmation.component';

const PointsRedemptionConfirmation = ({ route }) => (
  <IPayPointsRedemptionConfirmation params={route.params} testID="points-redemption-confirmation" />
);

export default PointsRedemptionConfirmation;
