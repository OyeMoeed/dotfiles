import { MusnaedInqueryRecords } from '@app/network/services/musaned';
import { RouteProp } from '@react-navigation/core';

export interface MusanedHistoryProps {}

export type MusanedHistoryScreenRouteProps = RouteProp<
  { params: { musnaedData?: Array<MusnaedInqueryRecords>; currentWalletNumber: string } },
  'params'
>;
