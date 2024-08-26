import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { IPayText } from '@components/atoms';
import React from 'react';
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
  children,
  color,
}: IPayTitle3TextProps) => {
  const textColor = { color };
  return (
    <IPayText
      testID={`${testID}-title3-text`}
      fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, textColor, style]}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayTitle3Text;
