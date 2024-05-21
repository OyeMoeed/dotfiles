import { typography } from '@app/styles/typography.styles';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import constants from '../constants.text';
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
  regular,
  style,
  numberOfLines,
  children
}: IPayTitle3TextProps): JSX.Element => {
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

export default IPayTitle3Text;
