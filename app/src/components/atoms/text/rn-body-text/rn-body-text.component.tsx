import { typography } from '@app/styles/typography';
import { constants } from '@app/utilities';
import { RNText } from '@components/atoms/index';
import React from 'react';
import { RNBodyTextProps } from './rn-body-text.interface';
import styles from './rn-body-text.styles';

/**
 * A component to display localized text.
 * @param {RNBodyTextProps} props - The props for the RNBodyText component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNBodyText: React.FC<RNBodyTextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children
}: RNBodyTextProps): JSX.Element => {
  return (
    <RNText
      testID={testID}
      fontFamily={regular ? constants.FONT_FAMILY.REGULAR : constants.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, style, regular ? typography.REGULAR_TEXT_STYLES : typography.BOLD_TEXT_STYLES]}
    >
      {text || children}
    </RNText>
  );
};

export default RNBodyText;
