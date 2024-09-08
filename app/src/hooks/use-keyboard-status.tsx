import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboardStatus() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isKeyboardWillOpen, setIsKeyboardWillOpen] = useState(false);

  const onKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  const onKeyboardWillHide = () => {
    setIsKeyboardWillOpen(false);
  };

  const onKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const onKeyboardWillShow = () => {
    setIsKeyboardWillOpen(true);
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);

    return () => {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return { isKeyboardOpen, isKeyboardWillOpen };
}
