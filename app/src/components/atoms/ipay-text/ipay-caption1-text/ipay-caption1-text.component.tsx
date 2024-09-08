import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import { IPayCaption1TextProps } from './ipay-caption1-text.interface';
import styles from './ipay-caption1-text.styles';

/**
 * A component to display localized text.
 * @param {IPayCaption1TextProps} props - The props for the RNCaption1Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayCaption1Text: React.FC<IPayCaption1TextProps> = ({
  testID,
  text,
  regular = true,
  style,
  numberOfLines,
  children,
  color,
}: IPayCaption1TextProps): JSX.Element => {
  const textColor = color ? { color } : {};
  return (
    <IPayText
      testID={`${testID}-caption-text`}
      fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, textColor, style]}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayCaption1Text;
