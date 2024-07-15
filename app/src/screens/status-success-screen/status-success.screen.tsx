import { IPaySuccessComponent } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import statusSuccessStyles from './status-success.style';

const StatusSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = statusSuccessStyles(colors);
  const localizationText = useLocalization();
  return (
    <IPayPageWrapper>
      <IPaySuccessComponent headingText={localizationText.TOP_UP.TOPUP_SUCCESS} />
    </IPayPageWrapper>
  );
};

export default StatusSuccessScreen;
