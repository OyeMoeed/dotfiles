import { IPayTitleAssistive, IPayView } from '@app/components/atoms';
import React from 'react';
import { IPayToggleButton } from '..';
import { IPayToggleTitleProps } from './ipay-toggle-button-title.interface';
import toggleTitleStyles from './ipay-toggle-button-title.style';

const IPayToggleTitle: React.FC<IPayToggleTitleProps> = ({ testID, heading, subHeading, onSwitchToggle }) => {
  const styles = toggleTitleStyles();

  return (
    <IPayView testID={`${testID}-toggle-title`} style={styles.container}>
      <IPayToggleButton toggleState={false} onToggleChange={onSwitchToggle} />
      <IPayTitleAssistive heading={heading} text={subHeading} />
    </IPayView>
  );
};

export default IPayToggleTitle;
