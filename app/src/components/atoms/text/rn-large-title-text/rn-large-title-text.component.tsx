import { typography } from '@app/styles/typography';
import { constants } from '@app/utilities';
import { RNText } from '@components/atoms/index';
import React from 'react';
import { RNLargeTitleTextProps } from './rn-large-title-text.interface';
import styles from './rn-large-title-text.styles';

/**
 * A component to display localized text.
 * @param {RNLargeTitleTextProps} props - The props for the RNLargeTitleText component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNLargeTitleText: React.FC<RNLargeTitleTextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children
}: RNLargeTitleTextProps): JSX.Element => {
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

export default RNLargeTitleText;
