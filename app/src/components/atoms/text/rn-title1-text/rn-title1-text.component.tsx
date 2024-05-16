import { typography } from '@app/styles/typography';
import { constants } from '@app/utilities';
import { RNText } from '@components/atoms/index';
import React from 'react';
import { RNTitle1TextProps } from './rn-title1-text.interface';
import styles from './rn-title1-text.styles';

/**
 * A component to display localized text.
 * @param {RNTitle1TextProps} props - The props for the RNTitle1Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNTitle1Text: React.FC<RNTitle1TextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children
}: RNTitle1TextProps): JSX.Element => {
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

export default RNTitle1Text;
