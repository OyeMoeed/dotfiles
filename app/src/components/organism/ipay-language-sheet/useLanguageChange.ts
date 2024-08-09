import constants from '@app/constants/constants';
import { useTypedDispatch } from '@app/store/store';
import { LanguageCode } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { setSelectedLanguage } from '@store/slices/language-slice';
import { useCallback, useImperativeHandle, useRef, useState } from 'react';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';


// Hook for modal actions
export const useModalActions = (ref: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef<bottomSheetTypes>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useImperativeHandle(ref, () => ({
    present: handlePresentModalPress,
    close: handleClosePress,
  }));

  return { bottomSheetModalRef, handlePresentModalPress, handleClosePress, isOpen };
};

// Hook for language change handling
export const useLanguageChange = (handleClosePress: () => void) => {
  const dispatch = useTypedDispatch();

  const handleLanguagePress = useCallback(
    (language: string, isRTL: boolean, code: LanguageCode) => {
      dispatch(setSelectedLanguage(code));
      I18nManager.forceRTL(isRTL);
      handleClosePress();

      if (isRTL !== I18nManager.isRTL) {
        setTimeout(() => {
          RNRestart.restart();
        }, constants.RESTART_DELAY_MILISECONDS);
      }
    },
    [dispatch, handleClosePress],
  );

  return handleLanguagePress;
};

