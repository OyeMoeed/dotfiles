import { useCallback, useEffect, useRef } from 'react';

import icons from '@app/assets/icons';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTypedSelector } from '@app/store/store';

import IPayCommonAlertSheet from '../ipay-common-alert-sheet/ipay-common-alert-sheet.component';

const IPayIdleTimerBottomSheet = () => {
  const { colors } = useTheme();
  const isIdleTimerVisible = useTypedSelector((state) => state.idleTimerSlice.visible);
  const bottomSheetModalRef = useRef<bottomSheetTypes>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useEffect(() => {
    if (isIdleTimerVisible) {
      handlePresentModalPress();
    } else {
      handleClosePress();
    }
  }, [handleClosePress, handlePresentModalPress, isIdleTimerVisible]);

  return (
    <IPayCommonAlertSheet
      ref={bottomSheetModalRef}
      headerTitle="IDLE_TIMER_SHEET.SHEET_TITLE"
      isForceAlert
      title="IDLE_TIMER_SHEET.TITLE"
      subtitle="IDLE_TIMER_SHEET.DESCRIPTION"
      icon={icons.clock_1}
      iconColor={colors.warning.warning500}
      onBtnPress={() => {}}
      btnTitle="COMMON.CONTINUE"
    />
  );
};

export default IPayIdleTimerBottomSheet;
