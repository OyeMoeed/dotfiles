import { typography } from '@app/styles/typography';
import { constants } from '@app/utilities';
import { RNText } from '@components/atoms/index';
import React from 'react';
import { RNTitle3TextProps } from './rn-title3-text.interface';
import styles from './rn-title3-text.styles';

/**
 * A component to display localized text.
 * @param {RNTitle3TextProps} props - The props for the RNTitle3Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNTitle3Text: React.FC<RNTitle3TextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children
}: RNTitle3TextProps): JSX.Element => {
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

export default RNTitle3Text;
