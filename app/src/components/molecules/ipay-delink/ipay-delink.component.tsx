import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { alertType, alertVariant } from '@app/utilities/enums.util';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { DelinkComponentProps } from './ipay-delink.interface';

// Define the Delink component
const IPayDelink: FC<DelinkComponentProps> = ({ onClose, visible, delink }) => {
  const { t } = useTranslation();

  return (
    <IPayAlert
      visible={visible}
      onClose={onClose}
      title="COMMON.DELINK_ALERT.TITLE"
      message="COMMON.DELINK_ALERT.TRY_AGAIN_TITTLE"
      type={alertType.SIDE_BY_SIDE}
      closeOnTouchOutside
      variant={alertVariant.DESTRUCTIVE}
      primaryAction={{
        text: t('COMMON.DELINK_ALERT.TRY_AGAIN'),
        onPress: onClose,
      }}
      secondaryAction={{
        text: t('COMMON.DELINK_ALERT.DELINK'),
        onPress: delink,
      }}
    />
  );
};

export default IPayDelink;
