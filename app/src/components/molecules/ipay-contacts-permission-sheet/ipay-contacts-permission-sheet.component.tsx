import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { PERMISSIONS } from 'react-native-permissions';
import useGetPermission from '@app/hooks/use-get-permission';
import { isAndroidOS } from '@app/utilities/constants';
import IPayCommonAlertSheet from '@app/components/organism/ipay-common-alert-sheet/ipay-common-alert-sheet.component';
import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import permissionSheetStyles from './ipay-contacts-permission-sheet.style';
import {
  IPayContactsPermissionInterface,
  IPayContactsPermissionRefType,
} from './ipay-contacts-permission-sheet.interface';

const IPayContactsPermission = forwardRef(
  ({ onPermissionGranted }: IPayContactsPermissionInterface, ref: ForwardedRef<IPayContactsPermissionRefType>) => {
    const styles = permissionSheetStyles();
    const bottomSheetModalRef = useRef<bottomSheetTypes>(null);
    const { requestPermission, checkPermission } = useGetPermission({
      permission: isAndroidOS ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS,
      ref: bottomSheetModalRef,
      onSuccess: onPermissionGranted,
      callOnMount: true,
    });

    useImperativeHandle(
      ref,
      () => ({
        checkPermission,
      }),
      [checkPermission],
    );

    return (
      <IPayCommonAlertSheet
        withCancelBtn
        ref={bottomSheetModalRef}
        headerTitle="WALLET_TO_WALLET.CONTACTS_PERMISSION_SHEET_TITLE"
        title="WALLET_TO_WALLET.CONTACTS_PERMISSION_TITLE"
        titleStyle={styles.title}
        subtitle="WALLET_TO_WALLET.CONTACTS_PERMISSION_DESCRIPTION"
        icon={icons.profileIcon}
        btnTitle="WALLET_TO_WALLET.CONTACTS_PERMISSION_BUTTON_TITLE"
        onBtnPress={requestPermission}
        onCloseBottomSheet={() => {}}
        buttonRightIcon={<IPayIcon icon={icons.exportIcon} />}
      />
    );
  },
);

export default IPayContactsPermission;
