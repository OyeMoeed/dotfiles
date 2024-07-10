import { IPayFlatlist, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList, IPayTermsAndConditionBanner, IPayTopUpBox } from '@app/components/molecules';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { ChangePinRefTypes, OpenBottomSheetRefTypes } from '@app/screens/card-options/card-options.interface';
import ChangeCardPin from '@app/screens/change-card-pin/change-card-pin.screens';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatNumberWithCommas } from '@app/utilities/number-comma-helper.util';
import { useRef } from 'react';
import IPaySafeAreaView from '../ipay-safe-area-view/ipay-safe-area-view.component';
import { IpayCardIssuanceConfirmationDetailsProps } from './ipay-card-issuance-confirmation-details.interface';
import CardIssuaceConfirmationStyles from './ipay-card-issuance-confirmation-details.styles';

const IPayCardIssuanceConfirmation: React.FC<
  IpayCardIssuanceConfirmationDetailsProps
> = ({}: IpayCardIssuanceConfirmationDetailsProps) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = CardIssuaceConfirmationStyles(colors);
  const termsRef = useRef('');
  const changePinRef = useRef<ChangePinRefTypes>(null);
  const openBottomSheet = useRef<OpenBottomSheetRefTypes>(null);
  const openTermsRef = () => {
    termsRef.current?.showTermsAndConditions();
  };
  const handleConfirm = () => {
    openBottomSheet.current?.present();
  };

  // TODO: Will be repace by API
  const listData = [
    {
      id: '1',
      title: localizationText.TOPUP_CONFIRMATION.HOLDERS_NAME,
      detailText: localizationText.TOPUP_CONFIRMATION.ADAM_AHMED,
    },
    {
      id: '2',
      title: localizationText.TOPUP_CONFIRMATION.CARD_TYPE,
      detailText: localizationText.MADA_DEBIT_CARD,
    },
    {
      id: '3',
      title: localizationText.TOPUP_CONFIRMATION.ISSUANCE_FEE,
      detailText: localizationText.TOPUP_CONFIRMATION.HUNDERED_SAR,
      style: styles.upperListContainer,
    },
  ];

  const balance = formatNumberWithCommas('5200.40');
  const onCloseBottomSheet = () => {
    changePinRef.current?.resetInterval();
    openBottomSheet.current?.close();
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.TOPUP_CONFIRMATION.VIRTUAL_CARD} applyFlex />
      <IPayTopUpBox availableBalance={balance} isShowTopup isShowProgress />
      <IPayLinearGradientView style={styles.gradientView}>
        <IPayView>
          <IPayFlatlist
            data={listData}
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item) => item.id}
            style={styles.flatlist}
            renderItem={({ item }) => (
              <IPayList
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
            <IPayButton
              large
              btnType="primary"
              btnText={localizationText.confirm}
              btnIconsDisabled
              onPress={handleConfirm}
            />
          </IPayView>
        </IPayView>
      </IPayLinearGradientView>
      <IPayTermsAndConditions ref={termsRef} />
      <IPayBottomSheet
        heading={localizationText.CARDS.VIRTUAL_CARD}
        enablePanDownToClose
        simpleHeader
        cancelBnt
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={openBottomSheet}
      >
        <ChangeCardPin
          onSuccess={() => {
            onCloseBottomSheet();
            navigate(screenNames.CHANGE_PIN_SUCCESS);
          }}
        />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default IPayCardIssuanceConfirmation;
