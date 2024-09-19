import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import { IPayTitle1TextProps } from './ipay-title1-text.interface';
import styles from './ipay-title1-text.styles';

/**
 * A component to display localized text.
 * @param {IPayTitle1TextProps} props - The props for the RNTitle1Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTitle1Text: React.FC<IPayTitle1TextProps> = ({
  testID,
  text,
  regular = true,
  style,
  numberOfLines,
  children,
  color,
  shouldTranslate = true,
}: IPayTitle1TextProps) => {
  const textColor = color ? { color } : {};
  return (
    <IPayText
      testID={`${testID}-title-text`}
      fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, textColor, style]}
      shouldTranslate={shouldTranslate}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayTitle1Text;
