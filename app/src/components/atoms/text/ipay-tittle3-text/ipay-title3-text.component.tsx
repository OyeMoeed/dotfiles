import { IPayText } from '@components/atoms/index';
import React from 'react';
import { typography } from '../utilities/typography-helper.util';
import { IPayTitle3TextProps } from './ipay-title3-text.interface';
import styles from './ipay-title3-text.styles';

/**
 * A component to display localized text.
 * @param {IPayTitle3TextProps} props - The props for the RNTitle3Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTitle3Text: React.FC<IPayTitle3TextProps> = ({
  testID,
  text,
  regular = true,
  style,
  numberOfLines,
  children
}: IPayTitle3TextProps): JSX.Element => {
  return (
    <IPayText
      testID={`${testID}-title3-text`}
      fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, style]}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayTitle3Text;