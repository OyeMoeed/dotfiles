import { IPayText } from '@components/atoms/index';
import React from 'react';
import { typography } from '../utilities/typography-helper.util';
import { IPaySubHeadlineTextProps } from './ipay-sub-headline-text.interface';
import styles from './ipay-sub-headline-text.styles';

/**
 * A component to display localized text.
 * @param {IPaySubHeadlineTextProps} props - The props for the RNSubHeadlineText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPaySubHeadlineText: React.FC<IPaySubHeadlineTextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children,
  color,
}: IPaySubHeadlineTextProps): JSX.Element => {
  const textColor = { color };
  return (
    <IPayText
      testID={`${testID}-sub-headline-text`}
      fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, textColor, style]}
    >
      {text || children}
    </IPayText>
  );
};

export default IPaySubHeadlineText;
