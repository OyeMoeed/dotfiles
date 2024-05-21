import { typography } from '@app/styles/typography.styles';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import constants from '../constants.text';
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
  children
}: IPayTitle2TextProps): JSX.Element => {
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

export default IPayTitle2Text;
