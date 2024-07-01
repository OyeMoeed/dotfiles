import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import { IPaySubHeadlineTextProps } from './ipay-headline-text.interface';
import styles from './ipay-headline-text.styles';

/**
 * A component to display localized text.
 * @param {IPaySubHeadlineTextProps} props - The props for the RNSubHeadlineText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayHeadlineText: React.FC<IPaySubHeadlineTextProps> = ({
  testID,
  text,
  regular = true,
  style,
  numberOfLines,
  children,
}: IPaySubHeadlineTextProps): JSX.Element => (
  <IPayText
    testID={`${testID}-headline-text`}
    fontFamily={regular ? typography.FONT_FAMILY.REGULAR : typography.FONT_FAMILY.BOLD}
    numberOfLines={numberOfLines}
    style={[styles.textStyle, style]}
  >
    {text || children}
  </IPayText>
);

export default IPayHeadlineText;
