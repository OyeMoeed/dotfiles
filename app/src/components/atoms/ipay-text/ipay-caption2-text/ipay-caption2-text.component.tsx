import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import { IPayCaption2TextProps } from './ipay-caption2-text.interface';
import styles from './ipay-caption2-text.styles';

/**
 * A component to display localized text.
 * @param {IPayCaption2TextProps} props - The props for the RNCaption2Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayCaption2Text: React.FC<IPayCaption2TextProps> = ({
  testID,
  text,
  regular = true,
  style,
  numberOfLines,
  children,
  color,
}: IPayCaption2TextProps): JSX.Element => {
  const textColor = { color };
  return (
    <IPayText
      testID={`${testID}-caption2-text`}
      fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, textColor, style]}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayCaption2Text;
