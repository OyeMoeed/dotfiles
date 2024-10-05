import { useCallback, useEffect, useRef } from 'react';

import icons from '@app/assets/icons';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';

import useTheme from '@app/styles/hooks/theme.hook';
import IPayCommonAlertSheet from '../ipay-common-alert-sheet/ipay-common-alert-sheet.component';

const IPayUpdateBottomSheet = () => {
  const { colors } = useTheme();
  const isUnderMaintenance = false;
  const bottomSheetModalRef = useRef<bottomSheetTypes>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useEffect(() => {
    if (isUnderMaintenance) {
      handlePresentModalPress();
    }

    handleClosePress();
  }, [handleClosePress, handlePresentModalPress, isUnderMaintenance]);

  return (
    <IPayCommonAlertSheet
      ref={bottomSheetModalRef}
      headerTitle="MAINTENTANCE_SHEET.SHEET_TITLE"
      isForceAlert
      title="MAINTENTANCE_SHEET.TITLE"
      subtitle="MAINTENTANCE_SHEET.DESCRIPTION"
      icon={icons.driverRefresh}
      iconColor={colors.warning.warning500}
    />
  );
};

export default IPayUpdateBottomSheet;
