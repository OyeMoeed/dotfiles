import { useEffect } from 'react';
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
  onSuccess?: (data?: object) => void;
  onError?: (error?: object) => void;
}) => {
  const { data, error, isSuccess, isError, status, isFetched, ...useQueryParams } = useQuery({
    queryFn,
    queryKey,
    retry: false,
    ...queyKeys,
  });
  useEffect(() => {
    if (data && isSuccess) {
      onSuccess?.(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && isError) {
      onError?.(error);
    }
  }, [isError]);

  return {
    data: (data as any)?.data,
    res: data,
    error,
    ...useQueryParams,
  };
};

export default useCustomQuery;
