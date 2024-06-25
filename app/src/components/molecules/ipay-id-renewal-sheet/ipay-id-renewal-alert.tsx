import React, { FC } from 'react';
import useLocalization from '@app/localization/hooks/localization.hook';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { alertType } from '@app/utilities/enums.util';
import { IPayIdRenewalSheetProps } from './ipay-id-renewal-sheet.interface';
import { IPayIcon } from '@app/components/atoms';
import icons from '@app/assets/icons';

const IPayRenewalIdAlert: FC<IPayIdRenewalSheetProps> = ({ onClose, visible }) => {
  const localizationText = useLocalization();

  return (
    <IPayAlert
      visible={visible}
      onClose={onClose}
      title={localizationText.thankyou}
      message={localizationText.id_updated}
      type={alertType.SIDE_BY_SIDE}
      closeOnTouchOutside
      showIcon={false}
      icon={<IPayIcon icon={icons.tick_square1} size={64} />}
      primaryAction={{
        text: localizationText.done,
        onPress: onClose,
      }}
    />
  );
};

export default IPayRenewalIdAlert;
