import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayFootnoteText from '../text/ipay-footnote-text/ipay-footnote-text.component';
import IPayView from '../view/ipay-view.component';
import { IPayTitleWithTextProps } from './ipay-title-with-text.interfacce';
import titleWithTextStyles from './ipay-title-with-text.style';

const IPayTitleWithText: React.FC<IPayTitleWithTextProps> = ({ heading, text }) => {
  const { colors } = useTheme();
  const styles = titleWithTextStyles(colors);
  return (
    <IPayView style={styles.container}>
      <IPayFootnoteText regular text={heading} style={styles.heading} />
      <IPayFootnoteText regular text={text} style={styles.subHeading} />
    </IPayView>
  );
};

export default IPayTitleWithText;
