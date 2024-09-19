import { useEffect } from 'react';
import { useQuery } from 'react-query';

const useCustomQuery = ({
  onSuccess,
  onError,
  ...queyKeys
}: {
  onSuccess?: (data?: object) => void;
  onError?: (error?: object) => void;
}) => {
  const { data, error, isSuccess, isError, status, isFetched, ...useQueryParams } = useQuery({
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
