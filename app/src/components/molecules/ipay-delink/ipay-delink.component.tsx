import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { alertType, alertVariant } from '@app/utilities/enums.util';
import { FC } from 'react';
import { DelinkComponentProps } from './ipay-delink.interface';

// Define the Delink component
const IPayDelink: FC<DelinkComponentProps> = ({ onClose, visible, delink }) => {
  const localizationText = useLocalization();

  return (
    <IPayAlert
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
        onPress: delink,
      }}
    />
  );
};

export default IPayDelink;
