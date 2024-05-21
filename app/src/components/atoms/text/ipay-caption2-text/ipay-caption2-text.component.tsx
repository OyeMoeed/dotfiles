import { typography } from '@app/styles/typography.styles';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import constants from '../constants.text';
import { IPayCaption2TextProps } from './ipay-caption2-text.interface';
import styles from './ipay-caption2-text.styles';

/**
 * A component to display localized text.
 * @param {IPayCaption2TextProps} props - The props for the RNCaption2Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayCaption2Text: React.FC<IPayCaption2TextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children
}: IPayCaption2TextProps): JSX.Element => {
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

export default IPayCaption2Text;
