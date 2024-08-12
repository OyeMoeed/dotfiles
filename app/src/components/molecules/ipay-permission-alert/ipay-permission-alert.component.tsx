import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import { isAndroidOS } from '@app/utilities/constants';
import { alertVariant } from '@app/utilities/enums.util';
import { FC } from 'react';
import { Linking } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { IPayPermissionAlertProps } from './ipay-offline-alert.interface';

const IPayPermissionAlert: FC<IPayPermissionAlertProps> = ({ onClose, visible }) => {
  const { title, description } = useTypedSelector((state) => state.permissionAlertReducer);
  const localizationText = useLocalization();

  // Function to navigate to settings
  const onGoToSettings = () => {
    onClose();
    if (isAndroidOS) {
      openSettings();
    } else {
      Linking.openURL(`App-Prefs:Privacy&path=LOCATION`);
    }
  };
  return (
    <IPayAlert
      visible={visible}
      onClose={onClose}
      showIcon={false}
      variant={alertVariant.DESTRUCTIVE}
      title={title || ''}
      message={description || ''}
      closeOnTouchOutside
      primaryAction={{
        text: localizationText.LOCATION.GO_TO_SETTINGS,
        onPress: onGoToSettings,
      }}
    />
  );
};

export default IPayPermissionAlert;
