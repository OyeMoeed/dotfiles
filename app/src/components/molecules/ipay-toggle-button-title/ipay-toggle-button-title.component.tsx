import { IPayTitleAssistive, IPayView } from '@app/components/atoms';
import IPayToggleButton from '@app/components/molecules/ipay-toggle-button/ipay-toggle-button.component';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayToggleTitleProps } from './ipay-toggle-button-title.interface';
import toggleTitleStyles from './ipay-toggle-button-title.style';

const IPayToggleTitle: React.FC<IPayToggleTitleProps> = ({ testID, heading, subHeading, onSwitchToggle }) => {
  const { colors } = useTheme();
  const styles = toggleTitleStyles(colors);

  return (
    <IPayView testID={`${testID}-toggle-title`} style={styles.container}>
      <IPayToggleButton toggleState={false} onToggleChange={onSwitchToggle} />
      <IPayTitleAssistive heading={heading} text={subHeading} />
    </IPayView>
  );
};

export default IPayToggleTitle;
