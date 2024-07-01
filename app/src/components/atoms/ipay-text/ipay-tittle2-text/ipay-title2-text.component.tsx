import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import { IPayTitle2TextProps } from './ipay-title2-text.interface';
import styles from './ipay-title2-text.styles';

/**
 * A component to display localized text.
 * @param {IPayTitle2TextProps} props - The props for the RNTitle2Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTitle2Text: React.FC<IPayTitle2TextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children,
}: IPayTitle2TextProps): JSX.Element => (
  <IPayText
    testID={`${testID}-title2-text`}
    fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
    numberOfLines={numberOfLines}
    style={[styles.textStyle, style]}
  >
    {text || children}
  </IPayText>
);

export default IPayTitle2Text;
