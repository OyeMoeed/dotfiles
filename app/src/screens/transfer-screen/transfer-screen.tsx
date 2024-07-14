import IPayTopupSuccess from "@app/components/organism/ipay-topuup-successful/ipay-topup-successful.component"
import { IPaySafeAreaView } from "@app/components/templates"
import { payChannel, topupStatus } from "@app/utilities/enums.util"

const TransferSuccess = () => {
  return (
    <IPaySafeAreaView>
      <IPayTopupSuccess completionStatus={topupStatus.SUCCESS} topupChannel={payChannel.WALLET} />
    </IPaySafeAreaView>
  )
}
export default TransferSuccess
