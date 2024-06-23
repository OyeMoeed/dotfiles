import { IPayCaption1Text, IPayTitle2Text, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayPageDescriptionTextProps } from './ipay-page-description-text.interface';
import pageDescriptionTextStyles from './ipay-page-description-text.style';

const IPayPageDescriptionText: React.FC<IPayPageDescriptionTextProps> = ({
  testID,
  heading,
  text,
  style,
  alignTextLeft,
}) => {
  const { colors } = useTheme();
  const styles = pageDescriptionTextStyles(colors);
  return (
    <IPayView testID={`${testID}-page-description`} style={[styles.container, style]}>
      <IPayTitle2Text text={heading} style={[styles.heading, alignTextLeft && styles.alignTextLeftStyle]} />
      {text && (
        <IPayCaption1Text regular text={text} style={[styles.subHeading, alignTextLeft && styles.alignTextLeftStyle]} />
      )}
    </IPayView>
  );
};

export default IPayPageDescriptionText;
