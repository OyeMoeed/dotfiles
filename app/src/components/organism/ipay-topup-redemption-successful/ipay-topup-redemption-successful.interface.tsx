// eslint-disable-next-line max-len
import { IRedeemPointsConfirmRes } from '@app/network/services/cards-management/mazaya-topup/redeem-points-confirm/redeem-points-confirm.interface';

interface IPayTopUpSuccessProps {
  testID?: string;
  variants: string;
  params?: IRedeemPointsConfirmRes;
}

export default IPayTopUpSuccessProps;
