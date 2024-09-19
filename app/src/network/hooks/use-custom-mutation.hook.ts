import { useEffect } from 'react';
import { useMutation } from 'react-query';

const useCustomMutation = ({
  onSuccess,
  onError,
  ...mutationKeys
}: {
  onSuccess?: (data?: object) => void;
  onError?: (error?: object) => void;
}) => {
  const { data, error, isSuccess, isError, ...useMutationParams } = useMutation({
    retry: false,
    ...mutationKeys,
  });

  useEffect(() => {
    if (data && onSuccess && isSuccess) {
      onSuccess(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && onError && isError) {
      onError(error);
    }
  }, [isError]);

  return {
    data: (data as any)?.data,
    res: data,
    error,
    isError,
    ...useMutationParams,
  };
};

export default useCustomMutation;
