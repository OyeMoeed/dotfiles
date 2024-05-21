import { typography } from '@app/styles/typography.styles';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import constants from '../constants.text';
import { IPayBodyTextProps } from './ipay-body-text.interface';
import styles from './ipay-body-text.styles';

/**
 * A component to display localized text.
 * @param {IPayBodyTextProps} props - The props for the RNBodyText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayBodyText: React.FC<IPayBodyTextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children
}: IPayBodyTextProps): JSX.Element => {
  return (
    <IPayText
      testID={testID}
      fontFamily={regular ? constants.FONT_FAMILY.REGULAR : constants.FONT_FAMILY.BOLD}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, style, regular ? typography.REGULAR_TEXT_STYLES : typography.BOLD_TEXT_STYLES]}
    >
      {text || children}
    </IPayText>
  );
};

export default IPayBodyText;
