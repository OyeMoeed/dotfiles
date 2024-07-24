import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayFailureProps } from './ipay-failure.interface';
import ipayFailerStyles from './ipay-failure.style';

const IPayFailure: React.FC<IPayFailureProps> = ({ testID, style, headingText, descriptionText }) => {
  const { colors } = useTheme();
  const styles = ipayFailerStyles(colors);

  return (
    <IPayView style={[styles.container, style]} testID={`${testID}-failure`}>
      <IPayView style={styles.failedVariant}>
        <IPayIcon icon={icons.danger12} size={80} />
        <IPayTitle2Text text={headingText} style={styles.failedText} />
        <IPayFootnoteText text={descriptionText} style={styles.failedSubtitle} />
      </IPayView>
    </IPayView>
  );
};

export default IPayFailure;
