import { typography } from '@app/styles/typography.styles';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import constants from '../constants.text';
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
  regular,
  style,
  numberOfLines,
  children
}: IPayFootnoteTextProps): JSX.Element => {
  return (
    <IPayText
      testID={testID}
      fontFamily={regular ? constants.FONT_FAMILY.REGULAR : constants.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, style, regular ? typography.REGULAR_TEXT_STYLES : typography.BOLD_TEXT_STYLES]}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayFootnoteText;
