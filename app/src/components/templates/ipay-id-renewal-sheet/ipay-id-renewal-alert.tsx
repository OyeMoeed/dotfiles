import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IPayIdRenewalSheetProps } from './ipay-id-renewal-sheet.interface';

const IPayRenewalIdAlert: FC<Pick<IPayIdRenewalSheetProps, 'visible' | 'onClose'>> = ({ onClose, visible }) => {
  const { t } = useTranslation();

  return (
    <IPayAlert
      visible={visible}
      onClose={onClose}
      title="ID_RENEWAL.THANK_YOU"
      message="ID_RENEWAL.ID_UPDATED"
      closeOnTouchOutside
      showIcon={false}
      icon={<IPayIcon icon={icons.tick_square1} size={64} />}
      primaryAction={{
        text: t('COMMON.DONE'),
        onPress: onClose,
      }}
    />
  );
};

export default IPayRenewalIdAlert;
