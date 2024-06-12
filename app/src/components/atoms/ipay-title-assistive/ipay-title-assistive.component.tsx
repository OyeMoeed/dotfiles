import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayFootnoteText from '../ipay-text/ipay-footnote-text/ipay-footnote-text.component';
import IPayView from '../ipay-view/ipay-view.component';
import { IPayTitleAssistiveProps } from './ipay-title-assistive.interfacce';
import titleAssistiveStyles from './ipay-title-assistive.style';

const IPayTitleAssistive: React.FC<IPayTitleAssistiveProps> = ({ testID, heading, text }) => {
  const { colors } = useTheme();
  const styles = titleAssistiveStyles(colors);
  return (
    <IPayView style={styles.container}>
      <IPayFootnoteText testID={`${testID}-heading`} regular text={heading} style={styles.heading} />
      <IPayFootnoteText testID={`${testID}-subheading`} regular text={text} style={styles.subHeading} />
    </IPayView>
  );
};

export default IPayTitleAssistive;
