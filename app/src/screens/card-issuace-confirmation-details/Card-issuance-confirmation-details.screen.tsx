import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList, IPayTermsAndConditionBanner, IPayTopUpBox } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { ChangePinRefTypes, OpenBottomSheetRefTypes } from '@app/screens/card-options/card-options.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatNumberWithCommas } from '@app/utilities/number-comma-helper.util';
import { useRef, useState } from 'react';
import IPaySafeAreaView from '../../components/templates/ipay-safe-area-view/ipay-safe-area-view.component';
import IssueCardPinCreation from '../issue-card-pin-creation/issue-card-pin-creation.screens';
import {
  IPayListItemProps,
  IpayCardIssuanceConfirmationDetailsProps,
} from './Card-issuance-confirmation-details.interface';
import CardIssuaceConfirmationStyles from './Card-issuance-confirmation-details.styles';

const CardIssuanceConfirmationScreen = (props: IpayCardIssuanceConfirmationDetailsProps) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const styles = CardIssuaceConfirmationStyles(colors);
  const termsRef = useRef('');
  const [isCheckTermsAndCondition, setIsCheckTermsAndCondition] = useState(false);
  const changePinRef = useRef<ChangePinRefTypes>(null);
  const openBottomSheet = useRef<OpenBottomSheetRefTypes>(null);
  const openTermsRef = () => {
    termsRef.current?.showTermsAndConditions();
  };
  const handleConfirm = () => {
    if (isCheckTermsAndCondition) {
      openBottomSheet.current?.present();
    } else {
      renderToast();
    }
  };
  const handleOnCheckPress = () => {
    setIsCheckTermsAndCondition(!isCheckTermsAndCondition);
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
      detailText: localizationText.TOPUP_CONFIRMATION.MADA_DEBIT_CARD,
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

  const renderItem = ({ item }: IPayListItemProps) => {
    return (
      <IPayList
        detailTextStyle={styles.detailsText}
        textStyle={styles.titleText}
        title={item.title}
        detailText={item.detailText}
        style={item.style}
      />
    );
  };

  const renderToast = () => {
    showToast({
      title: localizationText.COMMON.TERMS_AND_CONDITIONS_VALIDATION,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  return (
    <IPaySafeAreaView >
      <IPayHeader backBtn title={localizationText.TOPUP_CONFIRMATION.VIRTUAL_CARD} applyFlex />
      <IPayView style={styles.container}>
        <IPayTopUpBox availableBalance={balance} isShowTopup />
        <IPayLinearGradientView style={styles.gradientView}>
          <IPayView>
            <IPayFlatlist
              data={listData}
              contentContainerStyle={styles.listContainer}
              keyExtractor={(item) => item.id}
              style={styles.flatlist}
              renderItem={renderItem}
            />
          </IPayView>

          <IPayView>
            <IPayTermsAndConditionBanner
              isCheck={isCheckTermsAndCondition}
              onCheckPress={handleOnCheckPress}
              onPress={openTermsRef}
            />
            <IPayView>
              <IPayButton
                large
                btnType="primary"
                btnText={localizationText.COMMON.CONFIRM}
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
          <IssueCardPinCreation
            onSuccess={() => {
              onCloseBottomSheet();
              navigate(screenNames.CHANGE_PIN_SUCCESS);
            }}
          />
        </IPayBottomSheet>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default CardIssuanceConfirmationScreen;
