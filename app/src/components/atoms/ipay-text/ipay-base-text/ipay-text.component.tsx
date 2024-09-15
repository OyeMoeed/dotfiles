import useTheme from '@app/styles/hooks/theme.hook';
import useFonts from '@app/styles/theming/fonts.hook';

import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import React, { JSX } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { IPayTextProps } from './ipay-text.interface';
import styles from './ipay-text.style';

function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

/**
 * A component to display localized text.
 * @param {RNTextProps} props - The props for the RNText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayText: React.FC<IPayTextProps> = ({
  testID,
  text,
  style,
  fontFamily,
  numberOfLines,
  children,
  isAmount,
  varient = 'primary',
  fontWeight,
}: IPayTextProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const selectedFonts: Record<string, string | undefined> = useFonts();
  const getFontFamily: string | undefined = fontFamily !== undefined ? selectedFonts[fontFamily] : undefined;
  const baseTextStyles = styles(getFontFamily as string, colors);

  const texted = children ? String(children) : text;
  const propText = isAmount ? formatNumberWithCommas(texted || '') : texted;
  const isPropTextString = !isNumber(propText);
  const propsTextHasOneChar = propText?.toString().split(' ').length === 1;
  const showText = isPropTextString && propsTextHasOneChar ? t(String(propText)) : propText;

  return (
    <Text
      testID={`${testID}-base-text`}
      numberOfLines={numberOfLines}
      style={[baseTextStyles.textStyle, baseTextStyles[varient], { fontFamily: getFontFamily }, { fontWeight }, style]}
    >
      {showText}
    </Text>
  );
};

export default IPayText;
