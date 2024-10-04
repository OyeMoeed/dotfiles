import { FC, useCallback, useEffect, useRef } from 'react';

import icons from '@app/assets/icons';
import constants, { MAIN_APP_STORE_LINKS } from '@app/constants/constants';
import { useTypedSelector } from '@app/store/store';
import { openAppOrStore } from '@app/utilities/linking-utils';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';

import IPayCommonAlertSheet from '../ipay-common-alert-sheet/ipay-common-alert-sheet.component';
import { IPayUpdateComponentSheetProps } from './ipay-update-bottom-sheet.interface';

const IPayUpdateBottomSheet: FC<IPayUpdateComponentSheetProps> = () => {
  const shouldForceUpdate = useTypedSelector((state) => state.forceUpdateReducer.visible);
  const canForceUpdateClose = constants.CAN_FORCE_UPDATE_CLOSE;
  const bottomSheetModalRef = useRef<bottomSheetTypes>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useEffect(() => {
    if (shouldForceUpdate) {
      handlePresentModalPress();
    }

    handleClosePress();
  }, [handleClosePress, handlePresentModalPress, shouldForceUpdate]);

  const onPressAppUpdate = async () => {
    await openAppOrStore(MAIN_APP_STORE_LINKS);
  };

  return (
    <IPayCommonAlertSheet
      ref={bottomSheetModalRef}
      btnTitle="UPDATE.BUTTON_TITLE"
      onBtnPress={onPressAppUpdate}
      headerTitle="UPDATE.HEADER"
      isForceAlert={canForceUpdateClose}
      title="UPDATE.TITLE"
      subtitle="UPDATE.SUBTITLE"
      icon={icons.danger_light}
    />
  );
};

export default IPayUpdateBottomSheet;
