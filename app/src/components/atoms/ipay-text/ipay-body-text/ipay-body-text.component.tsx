import React, { JSX } from 'react';
import IPayText from '../ipay-base-text/ipay-text.component';
import { typography } from '../utilities/typography-helper.util';
import { IPayBodyTextProps } from './ipay-body-text.interface';
import styles from './ipay-body-text.styles';

/**
 * A component to display localized text.
 * @param {IPayBodyTextProps} props - The props for the RNBodyText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayBodyText: React.FC<IPayBodyTextProps> = ({
  testID,
  text,
  regular = true,
  style,
  numberOfLines,
  children,
  color,
  shouldTranslate = true,
}: IPayBodyTextProps): JSX.Element => {
  const textColor = color ? { color } : {};
  return (
    <IPayText
      testID={`${testID}-body-text`}
      fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, textColor, style]}
      shouldTranslate={shouldTranslate}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayBodyText;
