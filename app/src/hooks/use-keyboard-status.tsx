import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboardStatus() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const onKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  const onKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return () => {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
    };
  }, []);

  return isKeyboardOpen;
}
