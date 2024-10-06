import { MusnaedInqueryRecords } from '@app/network/services/musaned';
import { RouteProp } from '@react-navigation/core';

type MusanedUserDetailsRouteProps = RouteProp<
  { params: { musnaedData?: Array<MusnaedInqueryRecords>; userInfo: MusnaedInqueryRecords } },
  'params'
>;

export default MusanedUserDetailsRouteProps;
