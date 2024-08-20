import { IAktharPointsResponse } from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.interface';

interface IPointsRedemptionsRouteProps {
  aktharPointsInfo?: IAktharPointsResponse;
  isEligible: boolean;
}

export default IPointsRedemptionsRouteProps;
