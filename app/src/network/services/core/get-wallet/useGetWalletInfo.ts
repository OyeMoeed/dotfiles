import { useCustomQuery } from '@app/network/hooks';
import { useTypedDispatch } from '@app/store/store';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import WALLET_QUERY_KEYS from './get-wallet.query-keys';
import getWalletInfo from './get-wallet.service';
import { WalletNumberProp } from './get-wallet.interface';

const useGetWalletInfo = ({ payload }: { payload: WalletNumberProp }) => {
  const dispatch = useTypedDispatch();
  const { isLoading, res, error, refetch, isRefetching } = useCustomQuery({
    queryKey: [WALLET_QUERY_KEYS.GET_WALLET_INFO, payload?.walletNumber],
    queryFn: () => getWalletInfo(payload),
    onSuccess: (data) => {
      dispatch(setWalletInfo(data?.response));
    },
    enabled: !!payload?.walletNumber,
  });
  return {
    isLoadingWalletInfo: isLoading,
    walletInfo: res?.response,
    errorWalletInfo: error,
    refetchWalletInfo: refetch,
    isRefetchingWalletInfo: isRefetching,
  };
};

export default useGetWalletInfo;
