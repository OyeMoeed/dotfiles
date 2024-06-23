import React, { FC } from 'react';
import useLocalization from '@app/localization/hooks/localization.hook';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { alertType, alertVariant } from '@app/utilities/enums.util';
import { DelinkComponentProps } from './ipay-delink.interface';

// Define the Delink component
const IPayDelink: FC<DelinkComponentProps> = ({ onClose, visible, delink }) => {
  const localizationText = useLocalization();

  return (
    <IPayAlert
      visible={visible}
      onClose={onClose}
      title={localizationText.delink_title}
      message={localizationText.try_again_tittle}
      type={alertType.SIDE_BY_SIDE}
      closeOnTouchOutside
      variant={alertVariant.DESTRUCTIVE}
      primaryAction={{
        text: localizationText.try_again,
        onPress: onClose,
      }}
      secondaryAction={{
        text: localizationText.delink,
        onPress: delink,
      }}
    />
  );
};

export default IPayDelink;
