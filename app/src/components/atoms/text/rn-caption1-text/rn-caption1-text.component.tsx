import { typography } from '@app/styles/typography';
import { constants } from '@app/utilities';
import { RNText } from '@components/atoms/index';
import React from 'react';
import { RNCaption1TextProps } from './rn-caption1-text.interface';
import styles from './rn-caption1-text.styles';

/**
 * A component to display localized text.
 * @param {RNCaption1TextProps} props - The props for the RNCaption1Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNCaption1Text: React.FC<RNCaption1TextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children
}: RNCaption1TextProps): JSX.Element => {
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

export default RNCaption1Text;
