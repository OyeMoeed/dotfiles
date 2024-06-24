import useTheme from '@app/styles/hooks/theme.hook';
import { IPayCaption1Text, IPayTitle2Text, IPayView } from '@components/atoms/index';
import React from 'react';
import { IPayHeadingTextProps } from './ipay-heading-text.interface';
import headingTextStyles from './ipay-heading-text.style';

const IPayHeadingText: React.FC<IPayHeadingTextProps> = ({ testID, heading, text }) => {
  const { colors } = useTheme();
  const styles = headingTextStyles(colors);
  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayTitle2Text text={heading} style={styles.heading} />
      <IPayCaption1Text regular text={text} style={styles.subHeading} />
    </IPayView>
  );
};

export default IPayHeadingText;
