import React, { JSX } from 'react';
import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { IPayText } from '@components/atoms/index';
import { IPayFootnoteTextProps } from './ipay-footnote-text.interface';
import styles from './ipay-footnote-text.styles';

/**
 * A component to display localized text.
 * @param {IPayFootnoteTextProps} props - The props for the RNFootnoteText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayFootnoteText: React.FC<IPayFootnoteTextProps> = ({
  testID,
  text,
  regular = true,
  style,
  numberOfLines,
  children,
  color,
  fontWeight,
  shouldTranslate = true,
}: IPayFootnoteTextProps): JSX.Element => {
  const textColor = color ? { color } : {};
  return (
    <IPayText
      fontWeight={fontWeight}
      testID={`${testID}-footnote-text`}
      fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, textColor, style]}
      shouldTranslate={shouldTranslate}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayFootnoteText;
