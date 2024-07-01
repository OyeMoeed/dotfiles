import icons from '@app/assets/icons';
import { IPayRenewalIdAlert } from '@app/components/molecules';
import IPayIdRenewalSheet from '@app/components/molecules/ipay-id-renewal-sheet/ipay-id-renewal-sheet.component';
import IPayProfileVerificationSheet from '@app/components/molecules/ipay-profile-sheet/ipay-profile-verification-sheet.component';
import IPayRearrangeSheet from '@app/components/molecules/ipay-re-arrange-sheet/ipay-re-arrange-sheet.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import IPayTopbar from '@app/components/molecules/ipay-topbar/ipay-topbar.component';
import { IPayBalanceBox, IPayBottomSheet, IPayBottomSheetHome, IPayLatestList } from '@app/components/organism/index';
import { IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import getWalletInfo from '@app/network/services/core/get-wallet/get-wallet.service';
import getOffers from '@app/network/services/core/offers/offers.service';
import getTransactions from '@app/network/services/core/transaction/transactions.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS, isIpad } from '@app/utilities/constants';
import { IPayIcon, IPaySpinner, IPayView } from '@components/atoms';
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
  const verificationSheetRef = React.createRef<any>();
  const idInfoSheetRef = React.createRef<any>();
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<object[] | null>(null);
  const [offersData, setOffersData] = useState<object[] | null>(null);
  const topUpSelectionRef = React.createRef<any>();
  const dispatch = useTypedDispatch();
  const localizationFlag = useTypedSelector((state) => state.localizationReducer.localizationFlag);
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);

  const { showToast } = useToastContext();

  const items = [
    localizationText.action_section,
    localizationText.suggested_for_you,
    localizationText.transcation_history,
    localizationText.latest_offers,
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

  const getWalletInformation = async () => {
    setIsLoading(true);
    try {
      const payload = {
        walletNumber,
      };

      const apiResponse = await getWalletInfo(payload, dispatch);
      if (apiResponse?.ok) {
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.api_response_error);
      } else {
        setAPIError(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAPIError(error?.message || localizationText.something_went_wrong);
      renderToast(error?.message || localizationText.something_went_wrong);
    }
  };

  const getTransactionsData = async () => {
    setIsLoading(true);
    try {
      const payload = {
        walletNumber,
      };

      const apiResponse = await getTransactions(payload);
      if (apiResponse?.ok) {
        setTransactionsData(apiResponse?.data?.transactions);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.api_response_error);
      } else {
        setAPIError(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAPIError(error?.message || localizationText.something_went_wrong);
      renderToast(error?.message || localizationText.something_went_wrong);
    }
  };

  const getOffersData = async () => {
    setIsLoading(true);
    try {
      const payload = {
        walletNumber,
      };

      const apiResponse = await getOffers(payload);
      if (apiResponse?.ok) {
        setOffersData(apiResponse?.data?.offers);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.api_response_error);
      } else {
        setAPIError(apiResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAPIError(error?.message || localizationText.something_went_wrong);
      renderToast(error?.message || localizationText.something_went_wrong);
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

  const openVerificationBottomSheet = () => {
    verificationSheetRef.current.present();
  };

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
      {isLoading && <IPaySpinner />}
      {/* ---------Top Navigation------------- */}
      <IPayView style={[styles.topNavCon]}>
        <IPayTopbar captionText={localizationText.welcome} userName={userInfo?.firstName} />
      </IPayView>
      {/* ----------BalanceBox------------ */}
      <IPayView style={[styles.balanceCon]}>
        <IPayBalanceBox
          balance={walletInfo?.availableBalance}
          totalBalance={walletInfo?.currentBalance}
          hideBalance={appData?.hideBalance}
          walletInfoPress={() => navigate(screenNames.WALLET)}
          topUpPress={topUpSelectionBottomSheet}
        />
      </IPayView>
      {/* -------Pending Tasks--------- */}

      {isFocused && (
        <IPayBottomSheetHome
          style={styles.bottomSheetContainerStyle}
          ref={ref}
          customSnapPoint={['1%', isIpad() ? '24%' : isAndroidOS ? '42%' : '28%', maxHeight]}
        >
          <IPayLatestList
            transactionsData={transactionsData}
            offersData={offersData}
            openBottomSheet={openBottomSheet}
            openProfileBottomSheet={openProfileBottomSheet}
          />
        </IPayBottomSheetHome>
      )}

      {/* ------Rearrange Tasks--------- */}
      <IPayBottomSheet
        heading={localizationText.rearrange_sections}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['90%', '100%', maxHeight]}
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
        heading={localizationText.complete_profile_title}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['50%', isAndroidOS ? '60%' : '50%', maxHeight]}
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
        heading={localizationText.add_money_using}
        onCloseBottomSheet={closeBottomSheetTopUp}
        customSnapPoint={['20%', '53%']}
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
