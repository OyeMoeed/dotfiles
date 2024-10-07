import { useQuery, UseQueryOptions } from 'react-query';
import { isErrorResponse } from '../utilities/error-handling-helper';
import { ApiResponse } from '../services/services.interface';

const useCustomQuery = <TQueryFnData>({
  onSuccess,
  onError,
  queryFn,
  queryKey,
  ...queyKeys
}: UseQueryOptions<TQueryFnData>) => {
  const { data, error, isSuccess, isError, status, isFetched, ...useQueryParams } = useQuery({
    queryFn,
    queryKey,
    retry: false,
    onSuccess,
    onError,
    ...queyKeys,
    onSettled: (settledData: TQueryFnData | undefined, settledError: unknown | null) => {
      if (!settledData || isErrorResponse(settledData as unknown as ApiResponse<unknown>)) {
        onError?.(settledData);
      } else if (!settledError) {
        onSuccess?.(settledData);
      }
      queyKeys?.onSettled?.(settledData, settledError);
    },
  });

  return {
    data: (data as any)?.data,
    res: data,
    error,
    isSuccess,
    ...useQueryParams,
  };
};

export default useCustomQuery;
