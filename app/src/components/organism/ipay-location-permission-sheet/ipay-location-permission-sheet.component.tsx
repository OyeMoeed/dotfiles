import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { FC, useEffect, useRef } from 'react';
import { useTypedSelector } from '@app/store/store';
import { useGetLocation } from '@app/hooks';
import IPayCommonAlertSheet from '../ipay-common-alert-sheet/ipay-common-alert-sheet.component';
import { IPayLocationPermissionSheetProps } from './ipay-location-permission-sheet.interface';
import permissionSheetStyles from './ipay-location-permission-sheet.styles';

const IPayLocationPermissionSheet: FC<IPayLocationPermissionSheetProps> = ({ onLocationSelected }) => {
  const styles = permissionSheetStyles();
  const { modalVisible } = useTypedSelector((state) => state.permissionAlertReducer);

  const bottomSheetModalRef = useRef<bottomSheetTypes>(null);
  const { requestLocationPermission, handleClosePress, handlePresentSheet } = useGetLocation({
    onLocationSelected,
  });

  useEffect(() => {
    setTimeout(() => {
      if (modalVisible) {
        bottomSheetModalRef?.current?.present();
      } else {
        bottomSheetModalRef?.current?.close();
      }
    }, 400);
  }, [handleClosePress, handlePresentSheet, modalVisible]);

  return (
    <IPayCommonAlertSheet
      withCancelBtn={false}
      ref={bottomSheetModalRef}
      headerTitle="LOCATION.LOCATION_ACCESS"
      title="LOCATION.ALLOW_ALINMAPAY_LOCATION_ACCESS"
      titleStyle={styles.title}
      subtitle="LOCATION.PLEASE_ENABLE_LOCATION_ACCESS"
      icon="location-tick"
      btnTitle="LOCATION.ALLOW_LOCATION_ACCESS"
      onBtnPress={requestLocationPermission}
      onCloseBottomSheet={handleClosePress}
      isForceAlert
    />
  );
};

export default IPayLocationPermissionSheet;
