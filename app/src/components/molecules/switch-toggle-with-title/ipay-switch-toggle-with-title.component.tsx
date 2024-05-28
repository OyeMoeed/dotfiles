import { IPayTitleWithText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import IPayToggleButton from '@components/molecules/toggle-button/ipay-toggle-button.component';
import React from 'react';
import { IPaySwitchToggleWithTitleProps } from './ipay-switch-toggle-with-title.interface';
import swithToggleStyles from './ipay-switch-toggle-with-title.style';

const IPaySwitchToggleWithTitle: React.FC<IPaySwitchToggleWithTitleProps> = ({
  heading,
  subHeading,
  onSwitchToggle,
}) => {
  const { colors } = useTheme();
  const styles = swithToggleStyles(colors);

  return (
    <IPayView style={styles.container}>
      <IPayToggleButton toggleState={false} onToggleChange={onSwitchToggle} />
      <IPayTitleWithText heading={heading} text={subHeading} />
    </IPayView>
  );
};

export default IPaySwitchToggleWithTitle;
