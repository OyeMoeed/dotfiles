import { IPayFlatlist, IPayLinearGradientView, IPayView } from "@app/components/atoms";
import { IPayButton, IPayHeader, IPayList, IPayTermsAndConditionBanner, IPayTopUpBox } from "@app/components/molecules";
import { IPayTermsAndConditions } from "@app/components/organism";
import useLocalization from "@app/localization/hooks/localization.hook";
import useTheme from "@app/styles/hooks/theme.hook";
import { formatNumberWithCommas } from "@app/utilities/number-comma-helper.util";
import { useRef } from "react";
import IPaySafeAreaView from "../ipay-safe-area-view/ipay-safe-area-view.component";
import { IpayCardIssuanceConfirmationDetailsProps } from "./ipay-card-issuance-confirmation-details.interface";
import CardIssuaceConfirmationStyles from "./ipay-card-issuance-confirmation-details.styles";

const IPayCardIssuanceConfirmation: React.FC<IpayCardIssuanceConfirmationDetailsProps> = ({ }: IpayCardIssuanceConfirmationDetailsProps) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = CardIssuaceConfirmationStyles(colors);
  const termsRef = useRef('');

  const openTermsRef = () => {
    termsRef.current?.showTermsAndConditions();
  };

  // Prepare data for IPayFlatList
  const listData = [
    {
      id: '1',
      title: localizationText.HOLDERS_NAME,
      detailText: localizationText.Adam_Ahmed,
    },
    {
      id: '2',
      title: localizationText.CARD_TYPE,
      detailText: localizationText.MADA_DEBIT_CARD,
    },
    {
      id: '3',
      title: localizationText.ISSUANCE_FEE,
      detailText: localizationText.HUNDERED_SAR,
      style: styles.upperListContainer,
    }
  ];

  const balance = formatNumberWithCommas('5200.40')
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.VIRTUAL_CARD} applyFlex />
      <IPayTopUpBox availableBalance={balance} isShowTopup isShowProgress />
      <IPayLinearGradientView style={styles.gradientView}>
        <IPayView>
          <IPayFlatlist
            data={listData}
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item) => item.id}
            style={styles.flatlist}
            renderItem={({ item }) => (
              < IPayList
                detailTextStyle={styles.detailsText}
                textStyle={styles.titleText}
                title={item.title}
                isShowDetail
                detailText={item.detailText}
                style={item.style}
              />
            )}
          />
        </IPayView>

        <IPayView>
          <IPayTermsAndConditionBanner onPress={openTermsRef} />
          <IPayView>
            <IPayButton btnType="primary" medium btnText={localizationText.confirm} btnIconsDisabled />
          </IPayView>
        </IPayView>
      </IPayLinearGradientView>
      <IPayTermsAndConditions ref={termsRef} />
    </IPaySafeAreaView>
  );
};

export default IPayCardIssuanceConfirmation;

