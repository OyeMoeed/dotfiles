import { typography } from '@app/styles/typography.styles';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import constants from '../constants.text';
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
  color
}: IPaySubHeadlineTextProps): JSX.Element => {
  const textColor = { color };
  return (
    <IPayText
      testID={testID}
      fontFamily={regular ? constants.FONT_FAMILY.REGULAR : constants.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[
        styles.textStyle,
        style,
        textColor,
        regular ? typography.REGULAR_TEXT_STYLES : typography.BOLD_TEXT_STYLES
      ]}
    >
      {text || children}
    </IPayText>
  );
};

export default IPaySubHeadlineText;
