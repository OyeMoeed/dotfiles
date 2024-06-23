import languages from '@app/localization/languages.localization';
import { setLocalization } from '@app/store/slices/localization-slice';
import { useTypedDispatch } from '@app/store/store';
import { setSelectedLanguage } from '@store/slices/language-slice';
import { useCallback, useImperativeHandle, useRef, useState } from 'react';
import { I18nManager } from 'react-native';

// Hook for modal actions
export const useModalActions = (ref: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef(null);

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

  const onToggleChange = useCallback(
    (code: string) => {
      dispatch(setLocalization(code === languages.EN ? languages.EN : languages.AR));
      dispatch(setSelectedLanguage(code));
    },
    [dispatch],
  );

  const handleLanguagePress = useCallback(
    (language: string, isRTL: boolean, code: string) => {
      onToggleChange(code);
      I18nManager.forceRTL(isRTL);
      handleClosePress();
    },
    [onToggleChange, handleClosePress],
  );

  return handleLanguagePress;
};
