import { IpayCardIssuanceProps } from "./ipay-card-issuance-summary.interface";
import useLocalization from "@app/localization/hooks/localization.hook";
import IPaySafeAreaView from "../ipay-safe-area-view/ipay-safe-area-view.component";
import { IPayCheckbox, IPayFootnoteText, IPayIcon, IPayLinearGradientView, IPayPressable, IPayView } from "@app/components/atoms";
import { IPayButton, IPayList } from "@app/components/molecules";
import CardIssuaceStyles from "./ipay-card-issuace-summary.styles";
import useTheme from "@app/styles/hooks/theme.hook";
import icons from "@app/assets/icons";

const IPayCardIssuance: React.FC<IpayCardIssuanceProps> = ({ }: IpayCardIssuanceProps) => {
  const { colors } = useTheme()
  const localizationText = useLocalization()
  const styles = CardIssuaceStyles(colors)

  return (
    <IPayView style={styles.container}>
      <IPayView>
      </IPayView>
      <IPayLinearGradientView style={styles.gradientView}>
        <IPayView>
          <IPayView style={styles.listContainer}>
            <IPayList textStyle={styles.titleText} title={localizationText.HOLDERS_NAME} detailText={localizationText.Adam_Ahmed} isShowDetail />
            <IPayList textStyle={styles.titleText} title={localizationText.CARD_TYPE} />
          </IPayView>
          <IPayView style={styles.upperListContainer}>
            <IPayList title={localizationText.ISSUACE_FEE} textStyle={styles.titleText} />
          </IPayView>
        </IPayView>
        <IPayView>
          <IPayView>
            <IPayPressable style={styles.termsAndConditionsParentView}>
              <IPayView style={styles.termsAndConditionsView}>
                <IPayCheckbox />
                <IPayFootnoteText
                  style={styles.termAndConditionsText}
                  text={localizationText.terms_and_conditions_text}
                />
                <IPayIcon icon={icons.infoIcon} size={18} color={colors.primary.primary500} />
              </IPayView>
            </IPayPressable>

          </IPayView>
          <IPayView>
            <IPayButton btnType="primary" large btnText={localizationText.confirm} btnIconsDisabled />
          </IPayView>
        </IPayView>
      </IPayLinearGradientView>
    </IPayView>
  )
}
export default IPayCardIssuance
