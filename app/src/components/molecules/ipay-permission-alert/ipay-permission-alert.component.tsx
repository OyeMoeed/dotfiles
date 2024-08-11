import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { alertVariant } from '@app/utilities/enums.util';
import { FC } from 'react';
import { Linking } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { IPayPermissionAlertProps } from './ipay-offline-alert.interface';

const IPayPermissionAlert: FC<IPayPermissionAlertProps> = ({ onClose, visible }) => {
  const localizationText = useLocalization();
  enum SchemePath {
    LOCATION = 'LOCATION',
  }

  // Function to navigate to settings
  const onGoToSettings = () => {
    onClose();
    if (isAndroidOS) {
      openSettings();
    } else {
      Linking.openURL(`App-Prefs:Privacy&path=${SchemePath.LOCATION}`);
    }
  };
  return (
    <IPayAlert
      visible={visible}
      onClose={onClose}
      showIcon={false}
      variant={alertVariant.DESTRUCTIVE}
      title={localizationText.LOCATION.PERMISSION_REQUIRED}
      message={localizationText.LOCATION.LOCATION_PERMISSION_REQUIRED}
      closeOnTouchOutside
      primaryAction={{
        text: localizationText.LOCATION.GO_TO_SETTINGS,
        onPress: onGoToSettings,
      }}
    />
  );
};

export default IPayPermissionAlert;
