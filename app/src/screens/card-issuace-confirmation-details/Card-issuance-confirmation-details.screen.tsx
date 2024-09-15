import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList, IPayTermsAndConditionBanner, IPayTopUpBox } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayTermsAndConditions } from '@app/components/organism';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { ChangePinRefTypes } from '@app/screens/card-options/card-options.interface';
import useTheme from '@app/styles/hooks/theme.hook';

import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ICardIssuanceDetails } from '@app/network/services/cards-management/issue-card-inquire/issue-card-inquire.interface';
import { useTypedSelector } from '@app/store/store';
import { CardInfo } from '@app/network/services/cards-management/issue-card-confirm/issue-card-confirm.interface';
import { buttonVariants } from '@app/utilities';
import IPaySafeAreaView from '../../components/templates/ipay-safe-area-view/ipay-safe-area-view.component';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import IssueCardPinCreation from '../issue-card-pin-creation/issue-card-pin-creation.screens';
import { IPayListItemProps } from './Card-issuance-confirmation-details.interface';

import cardIssuaceConfirmationStyles from './Card-issuance-confirmation-details.styles';

const CardIssuanceConfirmationScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showToast } = useToastContext();
  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: { issuanceDetails: ICardIssuanceDetails } }, 'params'>;
  const { issuanceDetails } = route.params;
  const { fullName, availableBalance } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const styles = cardIssuaceConfirmationStyles(colors);
  const [isCheckTermsAndCondition, setIsCheckTermsAndCondition] = useState(false);
  const [showTermsAndConditionsSheet, setShowTermsAndConditionsSheet] = useState(false);
  const changePinRef = useRef<ChangePinRefTypes>(null);
  const openBottomSheet = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);

  const renderToast = () => {
    showToast({
      title: t('COMMON.TERMS_AND_CONDITIONS_VALIDATION'),
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const checkAvailableBalance = (fees: number): boolean => {
    if (fees > +availableBalance) {
      showToast({
        title: t('COMMON.INSUFFICIENT_BALANCE_COMMON'),
        isShowRightIcon: false,
        leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
      });
      return false;
    }
    return true;
  };

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const getTotalFees = () => {
    const { fees } = issuanceDetails;
    // eslint-disable-next-line no-unsafe-optional-chaining
    const totalFees = +fees?.bankFeeAmount + +fees?.bankVatAmount + +fees?.feeAmount + +fees?.vatAmount;
    return totalFees.toString();
  };

  const getCardTypeLabel = (): string => {
    const { cardType } = issuanceDetails;
    if (cardType === 'IPMC') {
      return t('VIRTUAL_CARD.CLASSIC');
    }
    if (cardType === 'VPPC') {
      return t('VIRTUAL_CARD.PLATINUM');
    }
    if (cardType === 'VSCC') {
      return t('VIRTUAL_CARD.SIGNATURE');
    }
    return '';
  };

  const listData = [
    {
      id: '1',
      title: t('TOPUP_CONFIRMATION.HOLDERS_NAME'),
      detailText: fullName,
    },
    {
      id: '2',
      title: t('TOPUP_CONFIRMATION.CARD_TYPE'),
      detailText: getCardTypeLabel(),
    },
    {
      id: '3',
      title: t('TOPUP_CONFIRMATION.ISSUANCE_FEE'),
      detailText: `${getTotalFees()} ${t('COMMON.SAR')}`,
      style: styles.upperListContainer,
    },
  ];

  const openTermsRef = () => {
    setShowTermsAndConditionsSheet(true);
  };

  const handleConfirm = async () => {
    if (!isCheckTermsAndCondition) {
      renderToast();
    } else if (checkAvailableBalance(+getTotalFees())) {
      openBottomSheet.current?.present();
    }
  };
  const handleOnCheckPress = () => {
    setIsCheckTermsAndCondition(!isCheckTermsAndCondition);
  };

  const balance = formatNumberWithCommas(availableBalance);
  const onCloseBottomSheet = () => {
    changePinRef.current?.resetInterval();
    openBottomSheet.current?.close();
  };

  const renderItem = ({ item }: IPayListItemProps) => (
    <IPayList
      detailTextStyle={styles.detailsText}
      textStyle={styles.titleText}
      title={item.title}
      detailText={item.detailText}
      style={item.style}
      showDetail
    />
  );

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title="TOPUP_CONFIRMATION.VIRTUAL_CARD" applyFlex />
      <IPayView style={styles.container}>
        <IPayTopUpBox availableBalance={balance} isShowTopup />
        <IPayView style={styles.gradientView}>
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
                btnType={buttonVariants.PRIMARY}
                btnText={t('COMMON.CONFIRM')}
                btnIconsDisabled
                onPress={handleConfirm}
              />
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayTermsAndConditions
        showTermsAndConditions={showTermsAndConditionsSheet}
        setShowTermsAndConditions={setShowTermsAndConditionsSheet}
        isVirtualCardTermsAndConditions
      />
      <IPayBottomSheet
        heading="CARDS.VIRTUAL_CARD"
        enablePanDownToClose
        simpleHeader
        cancelBnt
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={openBottomSheet}
      >
        <IssueCardPinCreation
          handleOnPressHelp={handleOnPressHelp}
          issuanceDetails={issuanceDetails}
          onSuccess={(cardInfo?: CardInfo) => {
            onCloseBottomSheet();
            navigate(screenNames.VIRTUAL_CARD_SUCCESS, { cardInfo });
          }}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '100%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent testID="help-center-bottom-sheet" />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default CardIssuanceConfirmationScreen;
