import { IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import React from 'react';

const StatusSuccessScreen: React.FC = () => {
  const localizationText = useLocalization();
  return (
    <IPayPageWrapper>
      <IPaySuccess headingText={localizationText.TOP_UP.TOPUP_SUCCESS} />
    </IPayPageWrapper>
  );
};

export default StatusSuccessScreen;
