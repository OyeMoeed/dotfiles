import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList, IPayTermsAndConditionBanner, IPayTopUpBox } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { ChangePinRefTypes } from '@app/screens/card-options/card-options.interface';
import useTheme from '@app/styles/hooks/theme.hook';

import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { queryClient } from '@app/network';
import { CardInfo } from '@app/network/services/cards-management/issue-card-confirm/issue-card-confirm.interface';
import { ICardIssuanceDetails } from '@app/network/services/cards-management/issue-card-inquire/issue-card-inquire.interface';
import { useGetCards } from '@app/network/services/core/transaction/get-cards';
import TRANSACTION_QUERY_KEYS from '@app/network/services/core/transaction/transaction.query-keys';
import { setTermsConditionsVisibility } from '@app/store/slices/bottom-sheets-slice';
import { useTypedSelector } from '@app/store/store';
import { buttonVariants } from '@app/utilities';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { IPayTopUpSelection } from '@app/components/templates';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import { SNAP_POINT } from '@app/constants/constants';
import IPaySafeAreaView from '../../components/templates/ipay-safe-area-view/ipay-safe-area-view.component';
import HelpCenterComponent from '../auth/forgot-passcode/help-center.component';
import IssueCardPinCreation from '../issue-card-pin-creation/issue-card-pin-creation.screens';
import { IPayListItemProps } from './Card-issuance-confirmation-details.interface';
import cardIssuanceConfirmationStyles from './Card-issuance-confirmation-details.styles';

const CardIssuanceConfirmationScreen = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showToast } = useToastContext();
  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: { issuanceDetails: ICardIssuanceDetails } }, 'params'>;
  const { issuanceDetails } = route.params;
  const [topUpOptionsVisible, setTopUpOptionsVisible] = useState<boolean>(false);
  const topUpSelectionRef = React.createRef<any>();

  const { walletNumber, fullName, availableBalance } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [isOtpVisible, setIsOtpVisible] = useState<boolean>(false);
  const styles = cardIssuanceConfirmationStyles(colors);
  const [isCheckTermsAndCondition, setIsCheckTermsAndCondition] = useState(false);
  const changePinRef = useRef<ChangePinRefTypes>(null);
  const helpCenterRef = useRef<any>(null);

  useGetCards({
    payload: {
      walletNumber,
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const renderToast = () => {
    showToast({
      title: 'COMMON.TERMS_AND_CONDITIONS_VALIDATION',
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const checkAvailableBalance = (fees: number): boolean => {
    if (fees > +availableBalance) {
      showToast({
        title: 'COMMON.INSUFFICIENT_BALANCE_COMMON',
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
    switch (cardType) {
      case 'IPMC':
        return 'VIRTUAL_CARD.CLASSIC_DEBIT_CARD';
      case 'VPPC':
        return 'VIRTUAL_CARD.PLATINUM_CASHBACK_PREPAID_CARD';
      case 'VSCC':
        return 'VIRTUAL_CARD.SIGNATURE_PREPAID_CARD';
      default:
        return '';
    }
  };

  const listData = [
    {
      id: '1',
      title: 'TOPUP_CONFIRMATION.HOLDERS_NAME',
      detailText: fullName,
    },
    {
      id: '2',
      title: 'TOPUP_CONFIRMATION.CARD_TYPE',
      detailText: getCardTypeLabel(),
    },
    {
      id: '3',
      title: 'TOPUP_CONFIRMATION.ISSUANCE_FEE',
      detailText: `${getTotalFees()} ${t('COMMON.SAR')}`,
      style: styles.upperListContainer,
    },
  ];

  const openTermsRef = () => {
    dispatch(
      setTermsConditionsVisibility({
        isVisible: true,
        isVirtualCardTermsAndConditions: true,
      }),
    );
  };

  const handleConfirm = async () => {
    if (!isCheckTermsAndCondition) {
      renderToast();
    } else if (checkAvailableBalance(+getTotalFees())) {
      setIsOtpVisible(true);
    }
  };
  const handleOnCheckPress = () => {
    setIsCheckTermsAndCondition(!isCheckTermsAndCondition);
  };

  const balance = formatNumberWithCommas(availableBalance);
  const onCloseBottomSheet = () => {
    changePinRef.current?.resetInterval();
    setIsOtpVisible(false);
  };

  const renderItem = ({ item }: IPayListItemProps) => (
    <IPayList
      detailTextStyle={styles.detailsText}
      textStyle={styles.titleText}
      title={item.title}
      detailText={item.detailText}
      style={item.style}
      rightContainerStyles={styles.labelDetailsText}
      containerStyle={styles.labelContainerStyle}
      showDetail
    />
  );

  const navigateTOAktharPoints = async () => {
    const aktharPointsResponse = await getAktharPoints(walletNumber);
    if (
      aktharPointsResponse?.status?.type === 'SUCCESS' &&
      aktharPointsResponse?.response?.mazayaStatus !== 'USER_DOES_NOT_HAVE_MAZAYA_ACCOUNT'
    ) {
      navigate(screenNames.POINTS_REDEMPTIONS, { aktharPointsInfo: aktharPointsResponse?.response, isEligible: true });
    } else {
      navigate(screenNames.POINTS_REDEMPTIONS, { isEligible: false });
    }
  };

  const closeBottomSheetTopUp = () => {
    setTopUpOptionsVisible(false);
  };

  const topupItemSelected = (routeName: string, params: {}) => {
    closeBottomSheetTopUp();
    if (routeName === screenNames.POINTS_REDEMPTIONS) {
      navigateTOAktharPoints();
    } else {
      navigate(routeName, params);
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title="TOPUP_CONFIRMATION.VIRTUAL_CARD" applyFlex />
      <IPayView style={styles.container}>
        <IPayTopUpBox
          onTopUpPress={() => {
            setTopUpOptionsVisible(true);
          }}
          availableBalance={balance}
          isShowTopup
        />
        <IPayView style={styles.gradientView}>
          <IPayView>
            <IPayFlatlist
              data={listData}
              contentContainerStyle={styles.listContainer}
              keyExtractor={(item) => item.id}
              style={styles.flatList}
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
                btnText="COMMON.CONFIRM"
                btnIconsDisabled
                onPress={handleConfirm}
              />
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayView>
      <IPayPortalBottomSheet
        isVisible={isOtpVisible}
        heading="CARDS.VIRTUAL_CARD"
        enablePanDownToClose
        simpleHeader
        cancelBnt
        customSnapPoint={['93%']}
        onCloseBottomSheet={onCloseBottomSheet}
      >
        <IssueCardPinCreation
          handleOnPressHelp={handleOnPressHelp}
          issuanceDetails={issuanceDetails}
          onSuccess={(cardInfo?: CardInfo) => {
            queryClient.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEYS.GET_CARDS] });

            onCloseBottomSheet();
            navigate(screenNames.VIRTUAL_CARD_SUCCESS, { cardInfo });
          }}
        />
      </IPayPortalBottomSheet>
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
      <IPayPortalBottomSheet
        noGradient
        heading="TOP_UP.ADD_MONEY_USING"
        onCloseBottomSheet={closeBottomSheetTopUp}
        customSnapPoint={SNAP_POINT.XS_SMALL}
        ref={topUpSelectionRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        cancelBnt
        isVisible={topUpOptionsVisible}
      >
        <IPayTopUpSelection
          testID="topUp-selection"
          closeBottomSheet={closeBottomSheetTopUp}
          topupItemSelected={topupItemSelected}
        />
      </IPayPortalBottomSheet>
    </IPaySafeAreaView>
  );
};

export default CardIssuanceConfirmationScreen;
