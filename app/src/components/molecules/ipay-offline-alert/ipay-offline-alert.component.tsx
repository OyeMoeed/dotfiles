import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { alertVariant } from '@app/utilities/enums.util';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IPayOfflineAlertProps } from './ipay-offline-alert.interface';

const IPayOfflineAlert: FC<IPayOfflineAlertProps> = ({ onClose, visible, testID }) => {
  const { t } = useTranslation();

  return (
    <IPayAlert
      testID={testID}
      visible={visible}
      onClose={onClose}
      showIcon={false}
      icon={<IPayIcon icon={icons.wifi} size={64} />}
      title="INTERNET_STATUS.INTERNET_LOST"
      message="INTERNET_STATUS.OFFLINE_DESC"
      closeOnTouchOutside
      variant={alertVariant.DESTRUCTIVE}
      primaryAction={{
        text: t('COMMON.DELINK_ALERT.TRY_AGAIN'),
        onPress: onClose,
      }}
    />
  );
};

export default IPayOfflineAlert;
