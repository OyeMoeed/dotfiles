import { typography } from '@app/styles/typography.styles';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import constants from '../constants.text';
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
  regular,
  style,
  numberOfLines,
  children
}: IPayLargeTitleTextProps): JSX.Element => {
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

export default IPayLargeTitleText;
