import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { FC } from 'react';
import { IPayIdRenewalSheetProps } from './ipay-id-renewal-sheet.interface';

const IPayRenewalIdAlert: FC<IPayIdRenewalSheetProps> = ({ onClose, visible }) => {
  const localizationText = useLocalization();

  return (
    <IPayAlert
      visible={visible}
      onClose={onClose}
      title={localizationText.ID_RENEWAL.THANK_YOU}
      message={localizationText.ID_RENEWAL.ID_UPDATED}
      closeOnTouchOutside
      showIcon={false}
      icon={<IPayIcon icon={icons.tick_square1} size={64} />}
      primaryAction={{
        text: localizationText.COMMON.DONE,
        onPress: onClose
      }}
    />
  );
};

export default IPayRenewalIdAlert;
