import IPayPointsRedemption from '@app/components/organism/ipay-points-redemption/ipay-points-redemption.component';
import { RouteProp, useRoute } from '@react-navigation/native';
import IPointsRedemptionsRouteProps from './points-redemptions.interface';

const PointsRedemptionsScreen = () => {
  const route = useRoute<
    RouteProp<{
      params: IPointsRedemptionsRouteProps;
      key: {};
      name: {};
    }>
  >();
  return <IPayPointsRedemption routeParams={route.params as IPointsRedemptionsRouteProps} />;
};

export default PointsRedemptionsScreen;
