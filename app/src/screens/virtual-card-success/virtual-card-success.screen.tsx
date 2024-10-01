import { IPayCardSuccess } from '@app/components/molecules';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { queryClient } from '@app/network';
import { useGetCards } from '@app/network/services/core/transaction/get-cards';
import TRANSACTION_QUERY_KEYS from '@app/network/services/core/transaction/transaction.query-keys';
import { setCards, setCurrentCard } from '@app/store/slices/cards-slice';
import { useTypedSelector } from '@app/store/store';
import { filterCards, mapCardData } from '@app/utilities/cards.utils';
import { isIosOS } from '@app/utilities/constants';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const VirtualCardSuccessScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);

  const getCardsData = async (cardApiResponse: any) => {
    if (cardApiResponse) {
      const availableCards = filterCards(cardApiResponse?.response?.cards);

      if (availableCards?.length) {
        dispatch(setCards(mapCardData(availableCards)));
        dispatch(setCurrentCard(mapCardData(availableCards)[0]));
      }
    }
  };

  const { refetch } = useGetCards({
    payload: {
      walletNumber,
    },
    onSuccess: getCardsData,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleHomePress = () => {
    queryClient.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEYS.GET_CARDS] });
    navigate(ScreenNames.HOME);
  };

  const handleGoToCard = () => {
    queryClient.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEYS.GET_CARDS] });
    refetch();

    navigate(ScreenNames.CARDS);
  };

  return (
    <IPayCardSuccess
      title="CARD_OPTIONS.ISSUE_CARD"
      subTitle={isIosOS ? t('CARD_OPTIONS.ADD_TO_APPLE_PAY') : ''}
      isAddAppleWallet={isIosOS}
      goHomeText="COMMON.HOME"
      handleHomePress={handleHomePress}
      handleGoToCard={handleGoToCard}
    />
  );
};

export default VirtualCardSuccessScreen;
