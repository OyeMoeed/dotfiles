import { typography } from '@app/components/atoms/text/utilities/typography-helper.util';
import { IPayText } from '@components/atoms/index';
import React from 'react';
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
  children
}: IPayFootnoteTextProps): JSX.Element => {
  return (
    <IPayText
      testID={`${testID}-footnote-text`}
      fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, style]}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayFootnoteText;
