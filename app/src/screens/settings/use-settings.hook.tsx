import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRef, useState } from 'react';
import { PasscodeChangeState, PasscodeTypes } from './settings.interface';

const useSettings = () => {
  const localizationText = useLocalization();
  const [currentPasscode, setCurrentPasscode] = useState<string>('');
  const [newPaasscode, setNewPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState(false);
  const currentPasscodeRef = useRef<bottomSheetTypes>(null);
  const changePasscodeRef = useRef<bottomSheetTypes>(null);
  const openBottomSheet = useRef<bottomSheetTypes>(null);
  const { passCode } = useTypedSelector((state) => state.appDataReducer.appData);
  const [renderView, setRenderView] = useState(PasscodeTypes.ResetPasscode);
  const onEnterPassCode = (currentCode: string) => {
    if (currentCode.length === 4) {
      if (currentCode == passCode) {
        changeView({ currentCode, nextComponent: PasscodeTypes.NewPasscode });
      } else {
        setPasscodeError(true);
        currentPasscodeRef.current?.triggerToast(localizationText.PROFILE.PASSCODE_ERROR);
      }
    } else {
      setPasscodeError(false);
    }
  };

  const changeView = (data: PasscodeChangeState) => {
    if (data?.currentCode) setCurrentPasscode(data?.currentCode);
    if (data?.newCode) setNewPasscode(data?.newCode);
    setRenderView(data.nextComponent);
  };

  // close passcode sheet
  const onCloseBottomSheet = () => {
    changePasscodeRef.current?.resetInterval();
    openBottomSheet.current?.close();
  };
  // open passcode sheet
  const onOpenPasscodeSheet = () => {
    setRenderView(PasscodeTypes.ResetPasscode);
    setPasscodeError(false);
    openBottomSheet.current?.present();
  };

  return {
    onEnterPassCode,
    passcodeError,
    renderView,
    setRenderView,
    setCurrentPasscode,
    currentPasscode,
    setNewPasscode,
    newPaasscode,
    currentPasscodeRef,
    changePasscodeRef,
    openBottomSheet,
    onCloseBottomSheet,
    onOpenPasscodeSheet,
    changeView,
  };
};

export default useSettings;
