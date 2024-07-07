import useTheme from '@app/styles/hooks/theme.hook';
import useFonts from '@app/styles/theming/fonts.hook';
import { formatNumberWithCommas } from '@utilities/number-comma-helper.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { IPayTextProps } from './ipay-text.interface';
import styles from './ipay-text.style';

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
}: IPayTextProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const selectedFonts: Record<string, string | undefined> = useFonts();
  const getFontFamily: string | undefined = fontFamily !== undefined ? selectedFonts[fontFamily] : undefined;
  const baseTextStyles = styles(getFontFamily as string, colors);

  return (
    <Text
      testID={`${testID}-base-text`}
      numberOfLines={numberOfLines}
      style={[baseTextStyles.textStyle, baseTextStyles[varient], { fontFamily: getFontFamily }, style]}
    >
      {text ? t(`${isAmount ? formatNumberWithCommas(text) : text}`) : children}
    </Text>
  );
};

export default IPayText;
