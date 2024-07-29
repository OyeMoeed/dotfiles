import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useCallback } from 'react';

const useTrafficViolationSuccess = () => {
  const goToHome = useCallback(() => {
    navigate(ScreenNames.HOME);
  }, []);

  return {
    goToHome,
  };
};

export default useTrafficViolationSuccess;
