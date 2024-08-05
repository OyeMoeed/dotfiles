import icons from '@app/assets/icons';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayRenewalIdAlert } from '@app/components/molecules';
import IPayIdRenewalSheet from '@app/components/molecules/ipay-id-renewal-sheet/ipay-id-renewal-sheet.component';
import IPayProfileVerificationSheet from '@app/components/molecules/ipay-profile-sheet/ipay-profile-verification-sheet.component';
import IPayRearrangeSheet from '@app/components/molecules/ipay-re-arrange-sheet/ipay-re-arrange-sheet.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import IPayTopbar from '@app/components/molecules/ipay-topbar/ipay-topbar.component';
import { IPayBalanceBox, IPayBottomSheet, IPayLatestList } from '@app/components/organism/index';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getWalletInfo from '@app/network/services/core/get-wallet/get-wallet.service';
import { HomeOffersProp } from '@app/network/services/core/offers/offers.interface';
import getOffers from '@app/network/services/core/offers/offers.service';
import { TransactionsProp } from '@app/network/services/core/transaction/transaction.interface';
import getTransactions from '@app/network/services/core/transaction/transactions.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS, isIosOS } from '@app/utilities/constants';
import FeatureSections from '@app/utilities/enum/feature-sections.enum';
import { APIResponseType, spinnerVariant } from '@app/utilities/enums.util';
import { IPayIcon, IPayView } from '@components/atoms';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React, { useCallback, useEffect, useState } from 'react';
import { setItems } from '../../store/slices/rearrangement-slice';
import homeStyles from './home.style';

const Home: React.FC = () => {
  const { colors } = useTheme();
  const [renewalAlertVisible, setRenewalAlertVisible] = useState(false);
  const styles = homeStyles(colors);
  const localizationText = useLocalization();
  const ref = React.createRef<any>();
  const rearrangeRef = React.createRef<any>();
  const profileRef = React.createRef<any>();
  const idInfoSheetRef = React.createRef<any>();
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<object[] | null>(null);
  const [offersData, setOffersData] = useState<object[] | null>(null);
  const [balanceBoxHeight, setBalanceBoxHeight] = useState<number>(0);
  const topUpSelectionRef = React.createRef<any>();
  const dispatch = useTypedDispatch();
  const localizationFlag = useTypedSelector((state) => state.localizationReducer.localizationFlag);
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);

  const { showToast } = useToastContext();
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const items = [
    FeatureSections.ACTION_SECTIONS,
    FeatureSections.SUGGESTED_FOR_YOU,
    FeatureSections.TRANSACTION_HISTORY,
    FeatureSections.LATEST_OFFERS,
  ];
  const onCloseRenewalId = () => {
    setRenewalAlertVisible(false);
  };
  const onOpenRenewalId = () => {
    setRenewalAlertVisible(true);
  };

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

  const getWalletInformation = async () => {
    renderSpinner(true);
    try {
      const payload = {
        walletNumber,
      };

      const apiResponse = await getWalletInfo(payload, dispatch);

      if (apiResponse?.apiResponseNotOk) {
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
        walletNumber: walletNumber,
        isHome: 'true',
      };

      const apiResponse: any = await getOffers(payload);
      if (apiResponse?.status?.type === 'SUCCESS') {
        setOffersData(apiResponse?.data?.offers);
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
    dispatch(setItems(items));
    getWalletInformation();
    getTransactionsData();
    getOffersData();
  }, []); // Empty dependency array to run the effect only once on initial render

  useEffect(() => {
    // Dispatch the setItems action whenever localizationFlag changes
    dispatch(setItems(items));
  }, [localizationFlag]); // Run the effect whenever localizationFlag changes

  const openIdInfoBottomSheet = () => {
    profileRef.current.close();
    idInfoSheetRef.current.present();
  };

  const topUpSelectionBottomSheet = () => {
    profileRef.current.close();
    topUpSelectionRef.current.present();
  };
  const closeBottomSheetTopUp = () => {
    topUpSelectionRef.current.close();
  };

  const openBottomSheet = () => {
    rearrangeRef.current.present();
  };
  const closeBottomSheet = () => {
    rearrangeRef.current.close();
  };
  const openProfileBottomSheet = () => {
    profileRef.current.present();
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

  return (
    <IPaySafeAreaView style={styles.container} linearGradientColors={colors.appGradient.gradientSecondary40}>
      {/* ---------Top Navigation------------- */}
      <IPayView style={[styles.topNavCon]}>
        <IPayTopbar captionText={localizationText.HOME.WELCOME} userName={userInfo?.firstName} />
      </IPayView>
      {/* ----------BalanceBox------------ */}
      <IPayView style={[styles.balanceCon]}>
        <IPayBalanceBox
          balance={walletInfo?.availableBalance}
          totalBalance={walletInfo?.currentBalance}
          hideBalance={appData?.hideBalance}
          walletInfoPress={() => navigate(ScreenNames.WALLET)}
          topUpPress={topUpSelectionBottomSheet}
          setBoxHeight={setBalanceBoxHeight}
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

      {/* ------Rearrange Tasks--------- */}
      <IPayBottomSheet
        heading={localizationText.COMMON.RE_ARRANGE_SECTIONS}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['90%', '98%', maxHeight]}
        ref={rearrangeRef}
        simpleHeader
        cancelBnt
        doneBtn
        simpleBar
        bold
      >
        <IPayRearrangeSheet />
      </IPayBottomSheet>
      {/* -------Profile------- */}
      <IPayBottomSheet
        heading={localizationText.HOME.COMPLETE_YOUR_PROFILE}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['50%', isIosOS ? '56%' : '62%', maxHeight]}
        ref={profileRef}
        simpleHeader
        simpleBar
        bold
      >
        <IPayProfileVerificationSheet onPress={openIdInfoBottomSheet} />
      </IPayBottomSheet>

      <IPayIdRenewalSheet ref={idInfoSheetRef} confirm={onOpenRenewalId} />
      <IPayRenewalIdAlert visible={renewalAlertVisible} onClose={onCloseRenewalId} />

      <IPayBottomSheet
        heading={localizationText.TOP_UP.ADD_MONEY_USING}
        onCloseBottomSheet={closeBottomSheetTopUp}
        customSnapPoint={['20%', '56%']}
        ref={topUpSelectionRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        cancelBnt
      >
        <IPayTopUpSelection closeBottomSheet={closeBottomSheetTopUp} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};
export default Home;
