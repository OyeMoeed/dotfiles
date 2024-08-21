import { useNavigation } from '@react-navigation/core';

const useInternationalTransferHook = () => {
  const navigation = useNavigation();

  const onSubmit = async () => {};
  return {
    onSubmit,
  };
};

export default useInternationalTransferHook;
