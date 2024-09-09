import icons from '@app/assets/icons';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import IPayRearrangeSheet from '@app/components/molecules/ipay-re-arrange-sheet/ipay-re-arrange-sheet.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import IPayTopbar from '@app/components/molecules/ipay-topbar/ipay-topbar.component';
import { IPayBalanceBox, IPayBottomSheet, IPayLatestList } from '@app/components/organism/index';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import { SNAP_POINT } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import getWalletInfo from '@app/network/services/core/get-wallet/get-wallet.service';
import { HomeOffersProp } from '@app/network/services/core/offers/offers.interface';
import getOffers from '@app/network/services/core/offers/offers.service';
import { TransactionsProp } from '@app/network/services/core/transaction/transaction.interface';
import { getTransactions } from '@app/network/services/core/transaction/transactions.service';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setProfileSheetVisibility } from '@app/store/slices/nafath-verification';
import { setRearrangedItems } from '@app/store/slices/rearrangement-slice';
import useTheme from '@app/styles/hooks/theme.hook';
import checkUserAccess from '@app/utilities/check-user-access';
import { isAndroidOS } from '@app/utilities/constants';
import { APIResponseType, spinnerVariant } from '@app/utilities/enums.util';
import { IPayIcon, IPayView } from '@components/atoms';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React, { useCallback, useEffect, useState } from 'react';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import homeStyles from './home.style';

const Home: React.FC = () => {
  const { colors } = useTheme();
  const [topUpOptionsVisible, setTopUpOptionsVisible] = useState<boolean>(false);

  const styles = homeStyles(colors);
  const localizationText = useLocalization();
  const ref = React.createRef<any>();
  const rearrangeRef = React.createRef<any>();
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<object[] | null>(null);
  const [offersData, setOffersData] = useState<object[] | null>(null);
  const [balanceBoxHeight, setBalanceBoxHeight] = useState<number>(0);
  const topUpSelectionRef = React.createRef<any>();

  const dispatch = useTypedDispatch();
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [tempreArrangedItems, setTempReArrangedItems] = useState<string[]>([]);

  const { showToast } = useToastContext();
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const openProfileBottomSheet = () => {
    dispatch(setProfileSheetVisibility(true));
  };

  useEffect(() => {
    checkUserAccess();
  }, []);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const renderSpinner = useCallback(
    (isVisbile: boolean) => {
      if (isVisbile) {
        showSpinner({
          variant: spinnerVariant.DEFAULT,
          hasBackgroundColor: true,
        });
      } else {
        hideSpinner();
      }
    },
    [isLoading],
  );

  const getTransactionsData = async () => {
    renderSpinner(true);
    try {
      const payload: TransactionsProp = {
        walletNumber,
        maxRecords: '3',
        offset: '1',
      };

      const apiResponse: any = await getTransactions(payload);

      if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
        setTransactionsData(apiResponse?.response?.transactions);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const getOffersData = async () => {
    renderSpinner(true);
    try {
      const payload: HomeOffersProp = {
        walletNumber,
        isHome: 'true',
      };

      const apiResponse: any = await getOffers(payload);
      if (apiResponse?.status?.type === 'SUCCESS') {
        setOffersData(apiResponse?.response?.offers);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
      renderSpinner(false);
    } catch (error) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    // Dispatch the setItems action on initial render
    getTransactionsData();
    getOffersData();
  }, []); // Empty dependency array to run the effect only once on initial render

  const topUpSelectionBottomSheet = () => {
    dispatch(setProfileSheetVisibility(false));
    setTopUpOptionsVisible(true);
  };
  const closeBottomSheetTopUp = () => {
    setTopUpOptionsVisible(false);
  };

  const navigateTOAktharPoints = async () => {
    showSpinner({
      variant: spinnerVariant.DEFAULT,
      hasBackgroundColor: true,
    });
    const aktharPointsResponse = await getAktharPoints(walletInfo.walletNumber);
    if (
      aktharPointsResponse?.status?.type === 'SUCCESS' &&
      aktharPointsResponse?.response?.mazayaStatus !== 'USER_DOES_NOT_HAVE_MAZAYA_ACCOUNT'
    ) {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { aktharPointsInfo: aktharPointsResponse?.response, isEligible: true });
    } else {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { isEligible: false });
    }
    hideSpinner();
  };

  const topupItemSelected = (routeName: string, params: {}) => {
    closeBottomSheetTopUp();
    if (routeName === ScreenNames.POINTS_REDEMPTIONS) {
      navigateTOAktharPoints();
    } else {
      navigate(routeName, params);
    }
  };

  const openBottomSheet = () => {
    rearrangeRef.current.present();
  };
  const closeBottomSheet = () => {
    rearrangeRef.current.close();
  };

  useFocusEffect(
    useCallback(() => {
      if (ref.current) {
        ref.current.present();
      }

      return () => {
        if (ref.current) {
          ref.current.close();
        }
      };
    }, []),
  );
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      ref.current?.present();
    } else ref.current?.forceClose();
  }, [isFocused]);
  const maxHeight = isAndroidOS ? '94%' : '85%';

  const getUpadatedWalletData = async () => {
    const payload = {
      walletNumber: walletNumber as string,
    };
    const apiResponse: any = await getWalletInfo(payload);
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      dispatch(setWalletInfo(apiResponse?.response));
    }
  };

  useEffect(() => {
    if (isFocused) {
      if (appData.allowEyeIconFunctionality) {
        dispatch(setAppData({ hideBalance: true }));
      }
      getUpadatedWalletData();
    }
  }, [isFocused, walletNumber]);

  const saveRearrangedItems = () => {
    if (tempreArrangedItems?.length > 0) dispatch(setRearrangedItems(tempreArrangedItems));
  };

  return (
    <IPaySafeAreaView style={styles.container} linearGradientColors={colors.appGradient.gradientSecondary40}>
      <>
        {/* ---------Top Navigation------------- */}
        <IPayView style={styles.topNavCon}>
          <IPayTopbar captionText={localizationText.HOME.WELCOME} userName={userInfo?.firstName} />
        </IPayView>
        {/* ----------BalanceBox------------ */}
        <IPayView style={styles.balanceCon}>
          <IPayBalanceBox
            balance={walletInfo?.availableBalance}
            totalBalance={walletInfo?.currentBalance}
            hideBalance={appData?.hideBalance}
            walletInfoPress={() => navigate(ScreenNames.WALLET)}
            topUpPress={topUpSelectionBottomSheet}
            setBoxHeight={setBalanceBoxHeight}
            monthlyRemainingOutgoingAmount={walletInfo.limitsDetails.monthlyRemainingOutgoingAmount}
            monthlyOutgoingLimit={walletInfo.limitsDetails.monthlyOutgoingLimit}
          />
        </IPayView>
        {/* -------Pending Tasks--------- */}
        {balanceBoxHeight > 0 && (
          <IPayCustomSheet boxHeight={balanceBoxHeight} gradientHandler simpleHandler={false}>
            <IPayLatestList
              transactionsData={transactionsData}
              offersData={offersData}
              openBottomSheet={openBottomSheet}
              openProfileBottomSheet={openProfileBottomSheet}
            />
          </IPayCustomSheet>
        )}

        <IPayBottomSheet
          heading={localizationText.COMMON.RE_ARRANGE_SECTIONS}
          onCloseBottomSheet={closeBottomSheet}
          customSnapPoint={['90%', '99%', maxHeight]}
          ref={rearrangeRef}
          simpleHeader
          cancelBnt
          doneBtn
          simpleBar
          bold
          onDone={saveRearrangedItems}
        >
          <IPayRearrangeSheet setTempList={setTempReArrangedItems} />
        </IPayBottomSheet>

        <IPayPortalBottomSheet
          noGradient
          heading={localizationText.TOP_UP.ADD_MONEY_USING}
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
      </>
    </IPaySafeAreaView>
  );
};
export default React.memo(Home);
