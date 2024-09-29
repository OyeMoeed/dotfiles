import { hidePermissionModal, showPermissionAlert } from '@app/store/slices/permission-alert-slice';
import { useTypedSelector } from '@app/store/store';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { FC, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import IPayCommonAlertSheet from '../ipay-common-alert-sheet/ipay-common-alert-sheet.component';
import { IPayLocationPermissionSheetProps } from './ipay-location-permission-sheet.interface';
import permissionSheetStyles from './ipay-location-permission-sheet.styles';

const IPayLocationPermissionSheet: FC<IPayLocationPermissionSheetProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const styles = permissionSheetStyles();
  const title = t('LOCATION.PERMISSION_REQUIRED');
  const description = t('LOCATION.LOCATION_PERMISSION_REQUIRED');

  const isModalVisible = useTypedSelector((state) => state.permissionAlertReducer.modalVisible);
  const bottomSheetModalRef = useRef<bottomSheetTypes>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    dispatch(hidePermissionModal());
    bottomSheetModalRef.current?.close();
  }, [dispatch]);

  useEffect(() => {
    if (!isModalVisible) {
      handlePresentModalPress();
    }

    // handleClosePress();
  }, [handleClosePress, handlePresentModalPress, isModalVisible]);

  const onPressAllowLocation = () => {
    handleClosePress();
    dispatch(showPermissionAlert({ title, description }));
  };

  return (
    <IPayCommonAlertSheet
      withCancelBtn
      ref={bottomSheetModalRef}
      headerTitle="LOCATION.LOCATION_ACCESS"
      title="LOCATION.ALLOW_ALINMAPAY_LOCATION_ACCESS"
      titleStyle={styles.title}
      subtitle="LOCATION.PLEASE_ENABLE_LOCATION_ACCESS"
      icon="location-tick"
      btnTitle="LOCATION.ALLOW_LOCATION_ACCESS"
      onBtnPress={onPressAllowLocation}
      onCloseBottomSheet={() => {
        dispatch(hidePermissionModal());
      }}
    />
  );
};

export default IPayLocationPermissionSheet;
