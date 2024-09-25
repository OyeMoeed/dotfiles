import { QueryFunction, QueryKey, useQuery } from 'react-query';

const useCustomQuery = <TQueryFnData>({
  onSuccess,
  onError,
  queryFn,
  queryKey,
  ...queyKeys
}: {
  queryFn?: QueryFunction<TQueryFnData, QueryKey>;
  queryKey?: QueryKey;
  onSuccess?: (data?: TQueryFnData) => void;
  onError?: (error?: object) => void;
}) => {
  const { data, error, isSuccess, isError, status, isFetched, ...useQueryParams } = useQuery({
    queryFn,
    queryKey,
    retry: false,
    onSuccess,
    onError,
    ...queyKeys,
  });

  return {
    data: (data as any)?.data,
    res: data,
    error,
    ...useQueryParams,
  };
};

export default useCustomQuery;
