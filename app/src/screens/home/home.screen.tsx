import icons from '@app/assets/icons';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import IPayRearrangeSheet from '@app/components/molecules/ipay-re-arrange-sheet/ipay-re-arrange-sheet.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import IPayTopbar from '@app/components/molecules/ipay-topbar/ipay-topbar.component';
import { IPayBalanceBox, IPayBottomSheet, IPayLatestList } from '@app/components/organism/index';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPayEhsanBottomSheet, IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import { DURATIONS, SNAP_POINT } from '@app/constants/constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import { WalletNumberProp } from '@app/network/services/core/get-wallet/get-wallet.interface';
import getWalletInfo from '@app/network/services/core/get-wallet/get-wallet.service';
import getOffers from '@app/network/services/core/offers/offers.service';
import {
  CardListItem,
  CardsProp,
  TransactionsProp,
} from '@app/network/services/core/transaction/transaction.interface';
import { getCards, getTransactions } from '@app/network/services/core/transaction/transactions.service';
import { setAppData } from '@app/store/slices/app-data-slice';
import { setProfileSheetVisibility } from '@app/store/slices/bottom-sheets-slice';
import { setRearrangedItems } from '@app/store/slices/rearrangement-slice';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardStatusNumber, CardTypes } from '@app/utilities';
import checkUserAccess from '@app/utilities/check-user-access';
import { isAndroidOS } from '@app/utilities/constants';
import { IPayIcon, IPayView } from '@components/atoms';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import homeStyles from './home.style';

const Home: React.FC = () => {
  const { colors } = useTheme();
  const [topUpOptionsVisible, setTopUpOptionsVisible] = useState<boolean>(false);
  const [ehsanVisible, setEhsanVisible] = useState<boolean>(false);

  const styles = homeStyles(colors);
  const { t } = useTranslation();
  const ref = React.createRef<any>();
  const rearrangeRef = React.createRef<any>();
  const [apiError, setAPIError] = useState<string>('');
  const [transactionsData, setTransactionsData] = useState<object[] | null>(null);
  const [offersData, setOffersData] = useState<object[] | null>(null);
  const [balanceBoxHeight, setBalanceBoxHeight] = useState<number>(0);
  const topUpSelectionRef = React.createRef<any>();
  const ehsanRef = React.createRef<any>();

  const [cardsData, setCardsData] = useState<CardInterface[]>([]);
  const dispatch = useTypedDispatch();
  const { walletNumber, firstName, availableBalance, currentBalance, limitsDetails } = useTypedSelector(
    (state) => state.walletInfoReducer.walletInfo,
  );
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [tempreArrangedItems, setTempReArrangedItems] = useState<string[]>([]);

  const { showToast } = useToastContext();

  const openProfileBottomSheet = () => {
    dispatch(setProfileSheetVisibility(true));
  };

  useEffect(() => {
    setTimeout(() => {
      checkUserAccess(true);
    }, DURATIONS.MEDIUM);
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

  const getTransactionsData = async () => {
    const payload: TransactionsProp = {
      walletNumber,
      maxRecords: '3',
      offset: '1',
    };

    const apiResponse: any = await getTransactions(payload);

    setTransactionsData(apiResponse?.response?.transactions);
  };

  const getOffersData = async () => {
    try {
      const payload: any = {
        walletNumber,
        isHome: 'true',
      };

      const apiResponse: any = await getOffers(payload);
      if (apiResponse?.status?.type === 'SUCCESS') {
        setOffersData(apiResponse?.response?.offers);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(t('ERROR.API_ERROR_RESPONSE'));
      } else {
        setAPIError(apiResponse?.error);
      }
    } catch (error: any) {
      setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
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

  const ehsanBottomSheet = () => {
    dispatch(setProfileSheetVisibility(false));
    setEhsanVisible(true);
  };

  const closeBottomSheetEhsan = () => {
    setEhsanVisible(false);
  };

  const navigateTOAktharPoints = async () => {
    const aktharPointsResponse = await getAktharPoints(walletNumber);
    if (
      aktharPointsResponse?.status?.type === 'SUCCESS' &&
      aktharPointsResponse?.response?.mazayaStatus !== 'USER_DOES_NOT_HAVE_MAZAYA_ACCOUNT'
    ) {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { aktharPointsInfo: aktharPointsResponse?.response, isEligible: true });
    } else {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { isEligible: false });
    }
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

  const getCardDesc = (cardType: CardTypes) => {
    switch (cardType) {
      case CardTypes.PLATINUM:
        return 'CARDS.PLATINUM_CASHBACK_PREPAID_CARD';

      case CardTypes.SIGNATURE:
        return 'CARDS.SIGNATURE_PREPAID_CARD';

      case CardTypes.CLASSIC:
        return 'CARDS.CLASSIC_DEBIT_CARD';

      default:
        return '';
    }
  };

  const mapCardData = (cards: CardListItem[]) => {
    try {
      let mappedCards = [];
      mappedCards = cards?.map((card: any) => ({
        name: card?.linkedName?.embossingName,
        cardType: card?.cardTypeId,
        cardHeaderText: getCardDesc(card?.cardTypeId),
        expired: card?.reissueDue,
        frozen: card.cardStatus === CardStatusNumber.Freezed,
        suspended: false,
        maskedCardNumber: card?.maskedCardNumber,
        cardNumber: card.lastDigits,
        creditCardDetails: {
          availableBalance: '5200.40',
        },
        totalCashbackAmt: card.totalCashbackAmt,
        ...card,
      }));

      return mappedCards;
    } catch (err) {}
  };

  const getCardsData = async () => {
    const payload: CardsProp = {
      walletNumber,
      hideError: true,
      hideSpinner: true,
    };
    const apiResponse: any = await getCards(payload);

    if (apiResponse) {
      const availableCardsForSearch = apiResponse?.response?.cards.filter(
        (card: any) =>
          card.cardStatus === CardStatusNumber.ActiveWithOnlinePurchase ||
          card.cardStatus === CardStatusNumber.ActiveWithoutOnlinePurchase ||
          card.cardStatus === CardStatusNumber.Freezed,
      );

      if (availableCardsForSearch?.length) {
        setCardsData(mapCardData(availableCardsForSearch));
      }
    }
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
    const payload: WalletNumberProp = {
      walletNumber,
      hideError: true,
      hideSpinner: true,
    };
    const apiResponse: any = await getWalletInfo(payload);
    if (apiResponse) {
      dispatch(setWalletInfo(apiResponse?.response));
    }
  };
  useEffect(() => {
    if (isFocused) {
      if (appData.allowEyeIconFunctionality) {
        dispatch(setAppData({ hideBalance: true }));
      }
      getUpadatedWalletData();
      getCardsData();
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
          <IPayTopbar captionText="HOME.WELCOME" userName={firstName} />
        </IPayView>
        {/* ----------BalanceBox------------ */}
        <IPayView style={styles.balanceCon}>
          <IPayBalanceBox
            balance={availableBalance}
            totalBalance={currentBalance}
            hideBalance={appData?.hideBalance}
            walletInfoPress={() => navigate(ScreenNames.WALLET)}
            topUpPress={topUpSelectionBottomSheet}
            setBoxHeight={setBalanceBoxHeight}
            monthlyRemainingOutgoingAmount={limitsDetails.monthlyRemainingOutgoingAmount}
            monthlyOutgoingLimit={limitsDetails.monthlyOutgoingLimit}
            ehsanPress={ehsanBottomSheet}
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
              cards={cardsData}
            />
          </IPayCustomSheet>
        )}

        <IPayBottomSheet
          heading="COMMON.RE_ARRANGE_SECTIONS"
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

        <IPayPortalBottomSheet
          noGradient
          heading="TOP_UP.ADD_MONEY_USING"
          onCloseBottomSheet={closeBottomSheetEhsan}
          customSnapPoint={SNAP_POINT.XS_SMALL}
          ref={ehsanRef}
          enablePanDownToClose
          simpleHeader
          simpleBar
          bold
          cancelBnt
          isVisible={ehsanVisible}
        >
          <IPayEhsanBottomSheet closeBottomSheetEhsan={closeBottomSheetEhsan} />
        </IPayPortalBottomSheet>
      </>
    </IPaySafeAreaView>
  );
};
export default React.memo(Home);
