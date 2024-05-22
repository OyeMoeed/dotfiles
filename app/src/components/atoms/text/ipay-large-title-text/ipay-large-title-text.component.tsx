import { IPayText } from '@components/atoms/index';
import React from 'react';
import { typography } from '../utilities/typography-helper.util';
import { IPayLargeTitleTextProps } from './ipay-large-title-text.interface';
import styles from './ipay-large-title-text.styles';

/**
 * A component to display localized text.
 * @param {IPayLargeTitleTextProps} props - The props for the RNLargeTitleText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayLargeTitleText: React.FC<IPayLargeTitleTextProps> = ({
  testID,
  text,
  regular = true,
  style,
  numberOfLines,
  children
}: IPayLargeTitleTextProps): JSX.Element => {
  return (
    <IPayText
      testID={`${testID}-large-text`}
      fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, style]}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayLargeTitleText;
