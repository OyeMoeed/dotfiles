import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { alertType, alertVariant } from '@app/utilities/enums.util';
import { FC } from 'react';
import { IPayOfflineAlertProps } from './ipay-offline-alert.interface';

const IPayOfflineAlert: FC<IPayOfflineAlertProps> = ({ onClose, visible, testID }) => {
  const localizationText = useLocalization();

  return (
    <IPayAlert
      testID={testID}
      visible={visible}
      onClose={onClose}
      title={localizationText.COMMON.DELINK_ALERT.TITLE}
      message={localizationText.COMMON.DELINK_ALERT.TRY_AGAIN_TITTLE}
      type={alertType.SIDE_BY_SIDE}
      closeOnTouchOutside
      variant={alertVariant.DESTRUCTIVE}
      primaryAction={{
        text: localizationText.COMMON.DELINK_ALERT.TRY_AGAIN,
        onPress: onClose,
      }}
      secondaryAction={{
        text: localizationText.COMMON.DELINK_ALERT.DELINK,
        onPress: onClose,
      }}
    />
  );
};

export default IPayOfflineAlert;
