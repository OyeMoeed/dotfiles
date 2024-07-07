import icons from "@app/assets/icons";
import { IPayCheckbox, IPayFootnoteText, IPayIcon, IPayLinearGradientView, IPayPressable, IPayView } from "@app/components/atoms";
import { IPayButton, IPayList } from "@app/components/molecules";
import useLocalization from "@app/localization/hooks/localization.hook";
import useTheme from "@app/styles/hooks/theme.hook";
import CardIssuaceStyles from "./ipay-card-issuace-summary.styles";
import { IpayCardIssuanceProps } from "./ipay-card-issuance-summary.interface";
import { useRef } from "react";
import { IPayTermsAndConditions } from "@app/components/organism";
import IPaySafeAreaView from "../ipay-safe-area-view/ipay-safe-area-view.component";

const IPayCardIssuance: React.FC<IpayCardIssuanceProps> = ({ }: IpayCardIssuanceProps) => {
  const { colors } = useTheme()
  const localizationText = useLocalization()
  const styles = CardIssuaceStyles(colors)
  const termsRef = useRef('')

  const openTermsRef = () => {
    termsRef.current?.showTermsAndConditions();
  }

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayView>
      </IPayView>
      <IPayLinearGradientView style={styles.gradientView}>
        <IPayView>
          <IPayView style={styles.listContainer}>
            <IPayList
              detailTextStyle={styles.detailsText}
              textStyle={styles.titleText}
              title={localizationText.HOLDERS_NAME}
              isShowDetail
              detailText={localizationText.Adam_Ahmed}
              isShowIcon
              icon={
                <IPayIcon icon={null} size={20} color={colors.natural.natural300} />
              }
            />
            <IPayList
              detailTextStyle={styles.detailsText}
              textStyle={styles.titleText}
              title={localizationText.CARD_TYPE}
              isShowDetail
              detailText={localizationText.MADA_DEBIT_CARD}
              isShowIcon
              icon={
                <IPayIcon icon={null} size={20} color={colors.natural.natural300} />
              }
            />
          </IPayView>
          <IPayView style={styles.upperListContainer}>
            <IPayList
              detailTextStyle={styles.detailsText}
              textStyle={styles.titleText}
              title={localizationText.ISSUANCE_FEE}
              isShowDetail
              detailText={localizationText.HUNDERED_SAR}
              isShowIcon
              icon={
                <IPayIcon icon={null} size={20} color={colors.natural.natural300} />
              }
            />
          </IPayView>
        </IPayView>
        <IPayView>
          <IPayView>
            <IPayPressable onPress={openTermsRef} style={styles.termsAndConditionsParentView}>
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
      <IPayTermsAndConditions ref={termsRef} />

    </IPaySafeAreaView>
  )
}
export default IPayCardIssuance
