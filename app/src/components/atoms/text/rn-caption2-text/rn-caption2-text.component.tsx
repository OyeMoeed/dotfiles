import { typography } from '@app/styles/typography';
import { constants } from '@app/utilities';
import { RNText } from '@components/atoms/index';
import React from 'react';
import { RNCaption2TextProps } from './rn-caption2-text.interface';
import styles from './rn-caption2-text.styles';

/**
 * A component to display localized text.
 * @param {RNCaption2TextProps} props - The props for the RNCaption2Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNCaption2Text: React.FC<RNCaption2TextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children
}: RNCaption2TextProps): JSX.Element => {
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

export default RNCaption2Text;
