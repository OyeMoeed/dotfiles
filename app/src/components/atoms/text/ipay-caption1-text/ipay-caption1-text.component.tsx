import { typography } from '@app/styles/typography.styles';
import { IPayText } from '@components/atoms/index';
import React from 'react';
import constants from '../constants.text';
import { IPayCaption1TextProps } from './ipay-caption1-text.interface';
import styles from './ipay-caption1-text.styles';

/**
 * A component to display localized text.
 * @param {IPayCaption1TextProps} props - The props for the RNCaption1Text component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayCaption1Text: React.FC<IPayCaption1TextProps> = ({
  testID,
  text,
  regular,
  style,
  numberOfLines,
  children
}: IPayCaption1TextProps): JSX.Element => {
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

export default IPayCaption1Text;
